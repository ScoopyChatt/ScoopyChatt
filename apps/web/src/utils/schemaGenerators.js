// Schema.org structured data generators for Scoopy Doo LLC

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://www.scoopychatt.com/#business",
    "name": "Scoopy Doo LLC",
    "alternateName": "Scoopy Chatt",
    "description": "Professional dog poop removal and pet waste cleanup service in Chattanooga, TN and surrounding areas. Weekly, bi-weekly, and one-time service for residential and commercial properties.",
    "url": "https://www.scoopychatt.com",
    "telephone": "+14236005040",
    "email": "info@scoopychatt.com",
    "image": "https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/7f889d94bae15b826df9c1daf461a7b9.png",
    "logo": "https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/7f889d94bae15b826df9c1daf461a7b9.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chattanooga",
      "addressRegion": "TN",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.0456,
      "longitude": -85.3097
    },
    "areaServed": [
      { "@type": "City", "name": "Chattanooga", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Chattanooga,_Tennessee" },
      { "@type": "City", "name": "Hixson", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Hixson,_Tennessee" },
      { "@type": "City", "name": "Ooltewah", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Ooltewah,_Tennessee" },
      { "@type": "City", "name": "East Brainerd", "addressRegion": "TN" },
      { "@type": "City", "name": "Red Bank", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Red_Bank,_Tennessee" },
      { "@type": "City", "name": "East Ridge", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/East_Ridge,_Tennessee" },
      { "@type": "City", "name": "Signal Mountain", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Signal_Mountain,_Tennessee" },
      { "@type": "City", "name": "Lookout Mountain", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Lookout_Mountain,_Tennessee" },
      { "@type": "City", "name": "Soddy-Daisy", "addressRegion": "TN", "sameAs": "https://en.wikipedia.org/wiki/Soddy-Daisy,_Tennessee" },
      { "@type": "City", "name": "Ringgold", "addressRegion": "GA", "sameAs": "https://en.wikipedia.org/wiki/Ringgold,_Georgia" },
      { "@type": "City", "name": "Fort Oglethorpe", "addressRegion": "GA", "sameAs": "https://en.wikipedia.org/wiki/Fort_Oglethorpe,_Georgia" },
      { "@type": "City", "name": "Rossville", "addressRegion": "GA", "sameAs": "https://en.wikipedia.org/wiki/Rossville,_Georgia" }
    ],
    "serviceType": "Pet Waste Removal",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pet Waste Removal Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Weekly Pet Waste Removal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bi-Weekly Pet Waste Removal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "One-Time Dog Waste Cleanup" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Pet Waste Removal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HOA Pet Waste Station Service" } }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "86",
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61578292444117",
      "https://www.instagram.com/scoopychatt/",
      "https://www.yelp.com/biz/scoopy-doo-ringgold",
      "https://www.bing.com/maps?ss=ypid.YNF8F072A96778C51B",
      "https://share.google/sOBVeLPqRabhfffPg"
    ],
    "priceRange": "$$"
  };
}

export function generateServiceSchema(serviceName, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "name": serviceName + " | Scoopy Doo LLC",
    "description": description,
    "url": url,
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://www.scoopychatt.com/#business",
      "name": "Scoopy Doo LLC"
    },
    "areaServed": {
      "@type": "State",
      "name": "Tennessee"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };
}

export function generateFAQPageSchema(faqData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question || item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer || item.a
      }
    }))
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateArticleSchema(title, description, author, datePublished, dateModified, content, image, url) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author || "Scoopy Doo Team"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.scoopychatt.com/#business",
      "name": "Scoopy Doo LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/7f889d94bae15b826df9c1daf461a7b9.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": image || "https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg",
    "url": url,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url }
  };
}

export function generateLocationSchema(locationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Pet Waste Removal",
    "name": "Dog Poop Removal in " + locationData.name,
    "description": locationData.seoDescription,
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://www.scoopychatt.com/#business",
      "name": "Scoopy Doo LLC"
    },
    areaServed: [{ "@type": "City", name: locationData.name }].concat((locationData.neighborhoods || []).map(function (n) { return { "@type": "Place", name: n + ", " + locationData.name }; })),
    "url": "https://www.scoopychatt.com/service/" + locationData.slug
  };
}
