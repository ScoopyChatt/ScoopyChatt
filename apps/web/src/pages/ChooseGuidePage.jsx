import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';
import { chooseGuide as g } from '@/data/chooseGuide.js';

const ChooseGuidePage = () => {
  const canonicalUrl = getCanonicalUrl(g.path);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{g.title}</title>
        <meta name="description" content={g.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={g.title} />
        <meta property="og:description" content={g.description} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <Header />
      <main className="flex-grow pb-24 md:pb-0">
        <article className="max-w-3xl mx-auto px-4 py-12">
          <nav aria-label="breadcrumb" className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="underline">Home</Link> / <Link to="/blog" className="underline">Guides</Link> / How to choose
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">{g.h1}</h1>
          <p className="text-lg text-muted-foreground mb-8">{g.intro}</p>

          {g.sections.map((s) => (
            <section key={s.h} className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">{s.h}</h2>
              {s.p.map((t, i) => <p key={i} className="text-muted-foreground leading-relaxed mb-3">{t}</p>)}
            </section>
          ))}

          <section className="mb-10 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">{g.howWeDo.h}</h2>
            {g.howWeDo.p.map((t, i) => <p key={i} className="text-muted-foreground leading-relaxed mb-3">{t}</p>)}
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {g.howWeDo.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p className="text-muted-foreground mt-4">
              See <Link to="/pricing" className="underline text-primary">full pricing</Link>,{' '}
              <Link to="/commercial" className="underline text-primary">commercial and HOA service</Link>,{' '}
              <Link to="/about" className="underline text-primary">about Scoopy Doo LLC</Link>, our{' '}
              <Link to="/press" className="underline text-primary">press coverage</Link>, or{' '}
              <Link to="/service/chattanooga" className="underline text-primary">pet waste removal in Chattanooga</Link>. You can also read an{' '}
              <Link to="/comparison" className="underline text-primary">honest comparison of local providers</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">Frequently asked questions</h2>
            {g.faqs.map((f) => (
              <div key={f.q} className="mb-5">
                <h3 className="text-lg font-semibold text-foreground mb-1">{f.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </section>

          <p className="text-muted-foreground">
            Ready to compare? <Link to="/quote" className="underline text-primary font-semibold">Get a free quote</Link>. We reply the same day.
          </p>
        </article>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default ChooseGuidePage;
