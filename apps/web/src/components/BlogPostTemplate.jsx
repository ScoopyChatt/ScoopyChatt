
import React from &rsquo;react&rsquo;;
import { Helmet } from &rsquo;react-helmet-async&rsquo;;
import Header from &rsquo;@/components/Header.jsx&rsquo;;
import Footer from &rsquo;@/components/Footer.jsx&rsquo;;
import { getCanonicalUrl, generateArticleSchema } from &rsquo;@/utils/seoHelpers.js&rsquo;;

const BlogPostTemplate = ({ title, description, slug, author, datePublished, image, content }) => {
  const url = getCanonicalUrl(`/blog/${slug}`);
  const articleSchema = generateArticleSchema(title, description, author, datePublished, image, url);
  const defaultImage = image || &rdquo;https://horizons-cdn.hostinger.com/d0188638-a120-4cbd-8c61-d1420711a271/8088ef4935a7739f1747caefac1fdcc6.jpg&rdquo;;

  return (
    <div className=&rdquo;min-h-screen flex flex-col bg-background&rdquo;>
      <Helmet>
        <title>{`${title} | Scoopy Doo`}</title>
        <meta name=&rdquo;description&rdquo; content={description} />
        <link rel=&rdquo;canonical&rdquo; href={url} />
        <meta property=&rdquo;og:title&rdquo; content={`${title} | Scoopy Doo`} />
        <meta property=&rdquo;og:description&rdquo; content={description} />
        <meta property=&rdquo;og:url&rdquo; content={url} />
        <meta property=&rdquo;og:image&rdquo; content={defaultImage} />
        <meta name=&rdquo;twitter:card&rdquo; content=&rdquo;summary_large_image&rdquo; />
        <script type=&rdquo;application/ld+json&rdquo;>
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Header />
      
      <main className=&rdquo;flex-grow py-24&rdquo;>
        <article className=&rdquo;max-w-4xl mx-auto px-4 sm:px-6 lg:px-8&rdquo;>
          <header className=&rdquo;mb-12 text-center&rdquo;>
            <h1 className=&rdquo;text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground text-balance&rdquo;>
              {title}
            </h1>
            <div className=&rdquo;flex items-center justify-center text-muted-foreground space-x-4&rdquo;>
              <span>By {author || &rsquo;Scoopy Doo Team&rsquo;}</span>
              <span>•</span>
              <time dateTime={datePublished}>{new Date(datePublished).toLocaleDateString(&rsquo;en-US&rsquo;, { month: &rsquo;long&rsquo;, day: &rsquo;numeric&rsquo;, year: &rsquo;numeric&rsquo; })}</time>
            </div>
          </header>
          
          <div 
            className=&rdquo;prose prose-lg dark:prose-invert max-w-none prose-headings:text-balance prose-headings:font-bold prose-p:leading-relaxed&rdquo;
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostTemplate;
