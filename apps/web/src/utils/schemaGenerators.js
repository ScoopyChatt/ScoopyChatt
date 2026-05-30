
import { seoConfig, CANONICAL_BASE_URL } from '@/config/seoConfig.js';

export const generateLocalBusinessSchema = (customData = {}) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": customData.name || "Scoopy Doo LLC",
    "image": customData.image || seoConfig.defaultImage,
    "telephone": customData.telephone || seoConfig.phone,
    "email": customData.email || seoConfig.email,
    "url": customData.url || CANONICAL_BASE_URL,
    "priceRange": customData.priceRange || "$$",
    "description": customData.description || "Professional pet waste removal service in Chattanooga, TN",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": customData.streetAddress || seoConfig.address.streetAddress,
      "addressLocality": customData.addressLocality || seoConfig.address.addressLocality,
      "addressRegion": customData.addressRegion || "TN",
      "postalCode": customData.postalCode || seoConfig.address.postalCode,
      "addressCountry": "US"
    },
    "geo": customData.geo || {
      "@type": "GeoCoordinates",
      "latitude": seoConfig.geo.latitude,
      "longitude": seoConfig.geo.longitude
    },
    "areaServed": customData.areaServed || [
      "Chattanooga", "Hixson", "Red Bank", "East Ridge", "Signal Mountain", "Ooltewah", 
      "East Brainerd", "Ringgold", "Cleveland", "Lookout Mountain", "Apison", 
      "Collegedale", "Flintstone", "Highland Park", "Rossville", "Soddy-Daisy", "Downtown"
    ].map(city => ({
      "@type": "City",
      "name": city
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "128"
    },
    "openingHoursSpecification": seoConfig.businessHours,
    "sameAs": seoConfig.socialProfiles
  };
};

export const generateServiceSchema = (serviceName, description, areaServed = "Chattanooga Metro", priceRange = "$$") => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Scoopy Doo LLC",
      "image": seoConfig.defaultImage,
      "url": CANONICAL_BASE_URL
    },
    "areaServed": {
      "@type": "City",
      "name": areaServed
    },
    "offers": {
      "@type": "Offer",
      "priceRange": priceRange,
      "url": `${CANONICAL_BASE_URL}/services`
    }
  };
};

export const generateArticleSchema = (title, description, datePublished, dateModified, author, content, image, url) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": image || seoConfig.defaultImage,
    "author": {
      "@type": "Person",
      "name": author || "Scoopy Doo Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Scoopy Doo LLC",
      "logo": {
        "@type": "ImageObject",
        "url": seoConfig.defaultImage
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "description": description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url || CANONICAL_BASE_URL
    }
  };
};

export const generateFAQPageSchema = (faqArray = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqArray.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Scoopy Doo LLC",
    "url": CANONICAL_BASE_URL,
    "logo": seoConfig.defaultImage,
    "description": "Professional pet waste removal service in Chattanooga, TN",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": seoConfig.phone,
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "en"
    },
    "sameAs": seoConfig.socialProfiles
  };
};

export const generatePriceRangeSchema = (serviceName = "Dog Poop Removal Service", lowPrice = "16", highPrice = "150", currency = "USD") => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Scoopy Doo LLC"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": currency,
      "lowPrice": lowPrice,
      "highPrice": highPrice
    }
  };
};
