// Extra customer questions for four service pages. ServiceFaqSection.jsx renders them and
// tools/service-faqs.cjs puts the same text in the prerendered HTML. Every answer restates
// a fact already published on the site (pricing page, commercial page, quote flow, doggy
// doors page); add nothing here that is not true and approved.
export const serviceFaqs = {
  "/commercial": {
    heading: "More Commercial and HOA Questions",
    items: [
      { q: "What does a commercial or HOA visit include?", a: "Each visit covers scheduled cleanup of common areas and green space. Where a property has pet waste stations, we also restock the bag dispensers, empty and re-line the receptacles, wipe down the units, and haul all waste off the property." },
      { q: "How is commercial service billed?", a: "Month-to-month, with no long-term contract. After a free walkthrough we quote a schedule and price for your property based on its size and how often you need service. Pet waste stations are $299 each installed and $10 per station per week to service." },
      { q: "How do I get started?", a: "Call or text 423-600-5040, or request a quote online at scoopychatt.com/quote, to set up a free walkthrough. Proof of insurance is available on request." },
    ],
  },
  "/near-me": {
    heading: "Common Questions About Local Pooper Scooper Service",
    items: [
      { q: "How much does pooper scooper service cost near me?", a: "Weekly service starts at $20 per visit for one dog, twice-weekly at $18, every-other-week at $33, and one-time cleanups at $85. Final pricing depends on yard size and number of dogs. See the pricing page for extra-dog rates." },
      { q: "How soon can service start?", a: "Most new customers can be added to a route within 2 to 5 days of getting a quote." },
      { q: "Do you serve my neighborhood?", a: "We serve the Chattanooga metro, including Hixson, Red Bank, Signal Mountain, Ooltewah, East Brainerd, Soddy-Daisy, East Ridge, Lookout Mountain, Apison and Collegedale in Tennessee, and Ringgold, Rossville, Fort Oglethorpe and Flintstone in Georgia. See the service areas page, or request a quote and we will confirm your address." },
      { q: "Do I need to be home?", a: "No. We close the gate behind us and send you a photo when the visit is done." },
    ],
  },
  "/one-time-cleanup": {
    heading: "One-Time Cleanup Questions",
    items: [
      { q: "How much does a one-time cleanup cost?", a: "One-time cleanups start at $85, which covers up to three dogs. Each dog beyond three adds $15." },
      { q: "What does a one-time cleanup include?", a: "An on-the-way text, a full grid-pattern sweep of the entire yard including corners and fence lines, all waste double-bagged and hauled off the property at no extra charge, and a gate photo when the job is done." },
      { q: "How soon can you come?", a: "Most one-time bookings are scheduled within 2 to 5 days." },
      { q: "Do I need to be home?", a: "No. You do not need to be home for the cleanup." },
      { q: "Can I switch to regular service afterward?", a: "Yes. A one-time cleanup can be the first step before weekly or every-other-week service, and there are no contracts either way." },
    ],
  },
  "/doggy-doors": {
    heading: "Doggy Doors Questions",
    items: [
      { q: "How does installation work?", a: "We measure your dog and the door, wall or glass so the fit is right the first time. We install and weather-seal the door, test it before we leave, clean up the work area and show you how the new door works." },
      { q: "Where do you install?", a: "We install in homes across Chattanooga and North Georgia." },
      { q: "How do I see pricing?", a: "Pricing for the Good, Better and Best options is shown after you enter your contact details on this page. We will text or email you about your quote, with no obligation." },
      { q: "What is the Founding Customer offer?", a: "For the first 20 installs, choosing Better gets you bumped up to Best at no charge. Choosing Good or Best adds a free 2-year Scoopy Doo installation and electronics protection plan instead." },
    ],
  },
};
