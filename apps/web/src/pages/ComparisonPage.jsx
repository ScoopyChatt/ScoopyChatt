import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';
import { comparison as c } from '@/data/comparisonData.js';

const ComparisonPage = () => {
  const canonicalUrl = getCanonicalUrl('/comparison');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.description} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <Header />

      <main className="flex-grow pb-24 md:pb-0">
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              {c.h1}
              <span className="block text-2xl md:text-3xl font-semibold text-muted-foreground mt-2">{c.h1Sub}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mt-4">{c.intro}</p>
            <p className="text-sm text-foreground max-w-3xl mt-4 font-medium border-l-4 border-primary pl-4">{c.disclosure}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Service area</th>
                    <th className="px-4 py-3 font-semibold">Frequency options</th>
                    <th className="px-4 py-3 font-semibold">Starting price</th>
                    <th className="px-4 py-3 font-semibold">Notable</th>
                    <th className="px-4 py-3 font-semibold">Source and status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {c.providers.map((s) => (
                    <tr key={s.name} className={s.name === "Scoopy Doo" ? "bg-primary/5" : "bg-background"}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                          {s.name}
                        </a>
                        {s.local && (
                          <span className="ml-2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Local</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">{s.area}</td>
                      <td className="px-4 py-4 text-sm text-foreground">{s.frequency}</td>
                      <td className="px-4 py-4 text-sm text-foreground">{s.price}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{s.notable}</td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {s.sources.map((src, i) => (
                          <React.Fragment key={src.url}>
                            {i > 0 && ', '}
                            <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{src.label}</a>
                          </React.Fragment>
                        ))}
                        . {s.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {c.tableNote} Last updated {c.updated}.
            </p>
          </div>
        </section>

        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">About Each Service</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {c.providers.map((d) => (
              <div key={d.name} className="rounded-lg border border-border p-5 bg-background">
                <h3 className="font-semibold text-foreground mb-2">{d.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">{c.association.h}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
            {c.association.text}{' '}
            <a href={c.association.source.url} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              {c.association.source.label}
            </a>
            .
          </p>
        </section>

        <section className="py-12 bg-primary/5">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Get a Free Quote from Scoopy Doo</h2>
            <p className="text-muted-foreground mb-6">
              Serving Chattanooga TN and North Georgia with no contracts. Not sure what to look for? Read our{' '}
              <Link to="/guides/how-to-choose-pet-waste-removal-company-chattanooga" className="underline text-primary">guide to choosing a pet waste removal company</Link>
              {' '}or see <Link to="/pricing" className="underline text-primary">pricing</Link>.
            </p>
            <Link
              to="/quote"
              className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default ComparisonPage;
