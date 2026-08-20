import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';

// Rendered for any URL the app does not have a route for. The edge middleware
// answers these requests with a real HTTP 404 so Google drops them instead of
// filing them as soft 404s; the noindex tag covers anything the middleware misses.
const NotFoundPage = ({ title = '404 - Page Not Found', message = "The page you're looking for doesn't exist." }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Helmet>
      <title>Page Not Found | Scoopy Doo</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <Header />
    <main className="flex-grow flex items-center justify-center py-20">
      <div className="text-center max-w-md px-4">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        <p className="text-muted-foreground mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/quote">Get a free quote</Link>
          </Button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFoundPage;
