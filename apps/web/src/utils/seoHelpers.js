
export const getCanonicalUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://www.scoopychatt.com${cleanPath === '/' ? '' : cleanPath}`;
};

// LocalBusiness schema is defined once in schemaGenerators.js (single source of truth)
export { generateLocalBusinessSchema } from './schemaGenerators.js';

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
