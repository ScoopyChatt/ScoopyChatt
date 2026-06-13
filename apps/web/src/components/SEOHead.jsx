
import React from &rsquo;react&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import { seoMetadata, getBlogPostMetadata } from &rsquo;@/config/seoMetadata.js&rsquo;;
import { CANONICAL_BASE_URL } from &rsquo;@/config/seoConfig.js&rsquo;;
import { generateLocalBusinessSchema, generateArticleSchema, generateFAQPageSchema } from &rsquo;@/utils/schemaGenerators.js&rsquo;;

const SEOHead = ({ 
  path,
  title, 
  description, 
  canonicalUrl, 
  schema, 
  image, 
  type, 
  noindex,
  // Blog specific props
  articleMetadata,
  // FAQ specific
  faqData
}) => {
  let baseMeta = {};
  
  if (articleMetadata) {
    baseMeta = getBlogPostMetadata(articleMetadata);
  } else if (path && seoMetadata[path]) {
    baseMeta = seoMetadata[path];
  }

  const finalTitle = title || baseMeta.title || &rdquo;Dog Poop Removal & Pooper Scooper Service | Chattanooga TN&rdquo;;
  const finalDescription = description || baseMeta.description || &rdquo;Professional pet waste removal and dog poop scooping services in Chattanooga, TN.&rdquo;;
  const finalCanonical = canonicalUrl || baseMeta.canonical || `${CANONICAL_BASE_URL}${path || &rsquo;&rsquo;}`;
  const finalImage = image || baseMeta.image || &rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg&rdquo;;
  const finalType = type || baseMeta.ogType || &rdquo;website&rdquo;;
  const shouldNoindex = noindex || baseMeta.noindex || false;

  const inputSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  const schemasToRender = [...inputSchemas];

  // Auto-inject schemas based on props/path
  const hasLocalBiz = schemasToRender.some(s => s[&rsquo;@type&rsquo;] === &rsquo;LocalBusiness&rsquo;);
  if (!hasLocalBiz) {
    schemasToRender.push(generateLocalBusinessSchema());
  }

  if (articleMetadata) {
    const hasArticle = schemasToRender.some(s => s[&rsquo;@type&rsquo;] === &rsquo;BlogPosting&rsquo; || s[&rsquo;@type&rsquo;] === &rsquo;Article&rsquo;);
    if (!hasArticle) {
      schemasToRender.push(generateArticleSchema(
        baseMeta.title,
        baseMeta.description,
        baseMeta.datePublished,
        baseMeta.datePublished,
        baseMeta.author,
        articleMetadata.content || &rdquo;&rdquo;,
        finalImage,
        finalCanonical
      ));
    }
  }

  
// Auto-inject BlogPosting schema for /blog/ pages not covered by articleMetadata
const isBlogPost = finalCanonical.includes(&rsquo;/blog/&rsquo;) && finalCanonical !== `${CANONICAL_BASE_URL}/blog`;
if (isBlogPost) {
  const hasArticle = schemasToRender.some(s => s[&rsquo;@type&rsquo;] === &rsquo;BlogPosting&rsquo; || s[&rsquo;@type&rsquo;] === &rsquo;Article&rsquo;);
  if (!hasArticle) {
    schemasToRender.push({
      &rdquo;@context&rdquo;: &rdquo;https://schema.org&rdquo;,
      &rdquo;@type&rdquo;: &rdquo;BlogPosting&rdquo;,
      &rdquo;headline&rdquo;: finalTitle.replace(&rsquo; | Scoopy Doo&rsquo;, &rsquo;&rsquo;).replace(&rsquo; | Scoopy Doo LLC&rsquo;, &rsquo;&rsquo;),
      &rdquo;description&rdquo;: finalDescription,
      &rdquo;author&rdquo;: {
        &rdquo;@type&rdquo;: &rdquo;Organization&rdquo;,
        &rdquo;name&rdquo;: &rdquo;Scoopy Doo LLC&rdquo;,
        &rdquo;url&rdquo;: &rdquo;https://www.scoopychatt.com&rdquo;
      },
      &rdquo;publisher&rdquo;: {
        &rdquo;@type&rdquo;: &rdquo;Organization&rdquo;,
        &rdquo;name&rdquo;: &rdquo;Scoopy Doo LLC&rdquo;,
        &rdquo;url&rdquo;: &rdquo;https://www.scoopychatt.com&rdquo;,
        &rdquo;logo&rdquo;: { &rdquo;@type&rdquo;: &rdquo;ImageObject&rdquo;, &rdquo;url&rdquo;: &rdquo;https://www.scoopychatt.com/scoopy-logo.png&rdquo; }
      },
      &rdquo;image&rdquo;: finalImage,
      &rdquo;url&rdquo;: finalCanonical,
      &rdquo;mainEntityOfPage&rdquo;: { &rdquo;@type&rdquo;: &rdquo;WebPage&rdquo;, &rdquo;@id&rdquo;: finalCanonical }
    });
  }
}

  if (faqData) {
    const hasFaq = schemasToRender.some(s => s[&rsquo;@type&rsquo;] === &rsquo;FAQPage&rsquo;);
    if (!hasFaq) {
      schemasToRender.push(generateFAQPageSchema(faqData));
    }
  }

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{finalTitle}</title>
      <meta name=&rdquo;description&rdquo; content={finalDescription} />
      <link rel=&rdquo;canonical&rdquo; href={finalCanonical} />
      {shouldNoindex && <meta name=&rdquo;robots&rdquo; content=&rdquo;noindex, nofollow&rdquo; />}
      
      {/* Open Graph / Facebook */}
      <meta property=&rdquo;og:type&rdquo; content={finalType} />
      <meta property=&rdquo;og:title&rdquo; content={finalTitle} />
      <meta property=&rdquo;og:description&rdquo; content={finalDescription} />
      <meta property=&rdquo;og:image&rdquo; content={finalImage} />
      <meta property=&rdquo;og:url&rdquo; content={finalCanonical} />
      <meta property=&rdquo;og:site_name&rdquo; content=&rdquo;Scoopy Doo LLC&rdquo; />
      
      {/* Twitter */}
      <meta name=&rdquo;twitter:card&rdquo; content=&rdquo;summary_large_image&rdquo; />
      <meta name=&rdquo;twitter:title&rdquo; content={finalTitle} />
      <meta name=&rdquo;twitter:description&rdquo; content={finalDescription} />
      <meta name=&rdquo;twitter:image&rdquo; content={finalImage} />

      {/* Schema.org JSON-LD structured data injection */}
      {schemasToRender.map((s, i) => (
        <script key={`schema-${i}`} type=&rdquo;application/ld+json&rdquo;>
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
