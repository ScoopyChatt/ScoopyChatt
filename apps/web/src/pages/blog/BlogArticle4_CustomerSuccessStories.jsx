
import React from 'react';
import BlogPostTemplate from '@/components/BlogPostTemplate.jsx';

const BlogArticle4_CustomerSuccessStories = () => {
  const meta = {
    title: "Customer Success Stories",
    description: "What Chattanooga customers say about Scoopy Doo pet waste removal, quoted word for word from our Google reviews.",
    author: "Scoopy Doo Team",
    datePublished: "2026-04-24",
    slug: "customer-success-stories",
    category: "Community"
  };

  // Every quote here is a verbatim Google review (see src/data/testimonials.js).
  const content = `
    <p class="lead">
      At Scoopy Doo, we measure success by the peace of mind we bring to our clients. Here is what customers across the Chattanooga area have said about us on Google, quoted word for word.
    </p>

    <h2>Busy Schedules, Handled</h2>
    <p>Most of our customers are working families who simply ran out of time to keep up with the yard.</p>
    <blockquote>
      "They do amazing! Come out, get the job done in a reasonable amount of time and we don't have to worry about our yard being picked up with our work schedules!"
      <br/> - Deidre Whitmire, Google review
    </blockquote>

    <h2>On Schedule, Every Time</h2>
    <p>Every visit starts with an on-the-way text and ends with a photo of your secured gate, so you always know the job is done.</p>
    <blockquote>
      "The service is great and they are always on schedule and keep you informed of the completed service."
      <br/> - Richard Hadden, Google review
    </blockquote>
    <blockquote>
      "Great communication and consistent service!"
      <br/> - Nathaniel Powers, Google review
    </blockquote>
    <blockquote>
      "They do a great job each and everytime. Very happy !"
      <br/> - Melody Scarborough, Google review
    </blockquote>

    <h2>A Local Owner You Can Reach</h2>
    <p>Scoopy Doo is locally owned, and customers deal with the owner directly.</p>
    <blockquote>
      "Scoopy Doo is an excellent business!! Brandon, the owner, was professional, polite, and courteous..."
      <br/> - Erin Peabody, Google review
    </blockquote>
    <blockquote>
      "They are an incredible service! Quick to respond and always great at communicating..."
      <br/> - Alyssa Hoffer, Google review
    </blockquote>

    <h2>Apartments and HOAs</h2>
    <p>We also service common areas and pet waste stations for apartment communities and HOAs.</p>
    <blockquote>
      "Scoopy Doo does a great job collecting at our community! Thank you for the attention to detail and keeping our apartments clean!"
      <br/> - Populus Waterside, property manager, Google review
    </blockquote>

    <p>Read every review, or leave your own, on our <a href="/reviews">reviews page</a>. Ready to start? <a href="/quote">Get your instant price</a>.</p>
  `;

  return (
    <BlogPostTemplate {...meta} content={content} />
  );
};

export default BlogArticle4_CustomerSuccessStories;
