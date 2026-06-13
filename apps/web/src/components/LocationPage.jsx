
import React from &rsquo;react&rsquo;;
import { useParams } from &rsquo;react-router-dom&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import SEOHead from &rsquo;@/components/SEOHead.jsx&rsquo;;
import LocationTemplate from &rsquo;@/components/LocationTemplate.jsx&rsquo;;
import { CANONICAL_BASE_URL } from &rsquo;@/config/seoConfig.js&rsquo;;
import { generateLocalBusinessSchema } from &rsquo;@/utils/schemaGenerators.js&rsquo;;

const LocationPage = () => {
  const { slug } = useParams();
  
  // Format slug string (e.g., &rsquo;east-brainerd&rsquo; -> &rsquo;East Brainerd&rsquo;)
  const formattedName = slug
    .split(&rsquo;-&rsquo;)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(&rsquo; &rsquo;);
  
  // Generate heavily localized Schema for this specific Service Area
  const localBizSchema = generateLocalBusinessSchema({
    name: `Scoopy Doo LLC - ${formattedName}`,
    addressLocality: formattedName,
    url: `${CANONICAL_BASE_URL}/service/${slug}`,
    description: `Professional pet waste removal and dog poop scooping service in ${formattedName}, TN.`,
    areaServed: [
      {
        &rdquo;@type&rdquo;: &rdquo;City&rdquo;,
        &rdquo;name&rdquo;: formattedName
      }
    ]
  });

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <SEOHead 
        title={`Dog Poop Removal in ${formattedName} | Scoopy Doo`}
        description={`Scoopy Doo offers professional dog poop removal and yard cleanup in ${formattedName}. Get a free quote for pet waste removal today!`}
        canonicalUrl={`${CANONICAL_BASE_URL}/service/${slug}`}
        schema={[localBizSchema]}
      />
      <Header />
      <main className=&rdquo;flex-grow&rdquo;>
        <LocationTemplate locationName={formattedName} />
      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
