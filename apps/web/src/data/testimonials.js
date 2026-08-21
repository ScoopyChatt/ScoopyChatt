// Verbatim Google reviews, quoted as written. Dates are the month derived from
// the relative timestamp shown on the Google Business Profile in Aug 2026.
//
// Three reviews were truncated by Google's "View full review" cut-off, so only
// the complete sentences are quoted and the excerpt ends with an ellipsis.
//
// Two reviews on the profile are deliberately not used: one is a five-star
// rating with no written text, and one is from a customer who wrote before
// their first pickup, which would misrepresent it as a review of the service.
//
// No Review or AggregateRating markup wraps these. Google does not allow
// self-serving review markup for a business on its own site.
export const testimonials = [
  {
    author: "Nathaniel Powers",
    date: "August 2026",
    quote: "Great communication and consistent service!",
  },
  {
    author: "Richard Hadden",
    date: "August 2026",
    quote:
      "The service is great and they are always on schedule and keep you informed of the completed service.",
  },
  {
    author: "Deidre Whitmire",
    date: "August 2026",
    quote:
      "They do amazing! Come out, get the job done in a reasonable amount of time and we don't have to worry about our yard being picked up with our work schedules!",
  },
  {
    author: "Richard Roche",
    date: "July 2026",
    quote: "Brandon and his team at Scoopy Doo have been great to work with...",
    excerpt: true,
  },
  {
    author: "Alyssa Hoffer",
    date: "June 2026",
    quote:
      "They are an incredible service! Quick to respond and always great at communicating...",
    excerpt: true,
  },
  {
    author: "Melody Scarborough",
    date: "June 2026",
    quote: "They do a great job each and everytime. Very happy !",
  },
  {
    author: "Erin Peabody",
    date: "May 2026",
    quote:
      "Scoopy Doo is an excellent business!! Brandon, the owner, was professional, polite, and courteous...",
    excerpt: true,
  },
  {
    author: "Populus Waterside, property manager",
    date: "April 2026",
    quote:
      "Scoopy Doo does a great job collecting at our community! Thank you for the attention to detail and keeping our apartments clean!",
    commercial: true,
  },
];

export default testimonials;
