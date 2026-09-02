import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { getCanonicalUrl } from '@/utils/seoHelpers.js';

const NoContactPetWasteRemovalChattanooga = () => {
  const canonicalUrl = getCanonicalUrl('/blog/no-contact-pet-waste-removal-chattanooga');

  return (
    <>
      <Helmet>
        <title>Do You Need to Be Home for Dog Poop Removal? | Scoopy Doo Chattanooga</title>
        <meta
          name="description"
          content="No, Scoopy Doo does not require you to be home. See exactly how our no-contact pooper scooper service works in Chattanooga and North Georgia, with gate photos and on-the-way texts."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Header />
      <main className="bg-white">
        <article className="max-w-3xl mx-auto px-4 py-12 md:py-16 prose prose-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Do You Need to Be Home for Dog Poop Removal in Chattanooga?
          </h1>
          <p className="text-gray-600 mb-8">
            Scoopy Doo LLC | Chattanooga, TN &amp; North Georgia
          </p>

          <p>
            Short answer: no. Scoopy Doo runs a fully no-contact pooper scooper service across
            Chattanooga and North Georgia, so you never have to rearrange your schedule, take
            time off work, or wait around for a truck to show up. Here is exactly how the process
            works, what we need from you before the first visit, and what a normal service day
            looks like.
          </p>

          <h2>How No-Contact Dog Poop Removal Works</h2>
          <p>
            Most of our customers are not home when we scoop, and that is by design. When you
            sign up, we ask for your gate code or gate location, any pet safety notes (friendly
            but excitable, stays inside, etc.), and the best number for text updates. On service
            day, our tech lets themselves into the yard, scoops every visible pile, checks
            corners and fence lines dogs tend to use most, and closes the gate behind them on
            the way out.
          </p>
          <p>
            You get two things automatically: a gate photo showing the gate was closed and
            secured after your visit, and an on-the-way text before we arrive so you know roughly
            when to expect us. No knock, no doorbell, no interruption to your day.
          </p>

          <h2>What We Need From You Before the First Visit</h2>
          <p>Before your first scoop, we just need three things:</p>
          <ul>
            <li>Gate access (a code, a combination lock, or a spot to leave a key)</li>
            <li>Confirmation of where your dog or dogs will be during service</li>
            <li>A phone number for the on-the-way text and gate photo</li>
          </ul>
          <p>
            That is it. No walkthrough required, no need to meet us in person unless you want to.
          </p>

          <h2>What If My Gate Is Locked or My Dog Is Outside?</h2>
          <p>
            If a gate is locked and we were not given a working code, we will text you from the
            driveway rather than skip the visit silently, so you can let us know how to get in or
            reschedule. If your dog is outside and unexpectedly not secured indoors or in a
            separate area, our tech will not enter the yard for everyone&apos;s safety, and we
            will text you to reschedule that visit at no extra charge. Clear notes on your
            account (dog stays in the garage during visits, gate code changed, etc.) prevent
            almost all of these hiccups.
          </p>

          <h2>How Much Does It Cost?</h2>
          <p>
            Pricing is per visit and scales with how often we come and how many dogs you have.
            For one dog:
          </p>
          <ul>
            <li>Weekly service: from $20 per visit</li>
            <li>Twice-weekly service: from $18 per visit</li>
            <li>Bi-weekly (every other week) service: from $33 per visit</li>
            <li>One-time cleanup: from $85</li>
          </ul>
          <p>
            There are no contracts. You can pause, change your frequency, or cancel at any time,
            and commercial properties and HOAs can request a custom quote for shared common
            areas or pet waste stations.
          </p>

          <h2>Why We Built the Service This Way</h2>
          <p>
            Chattanooga is a working city, and most of our customers leave for the office, drop
            kids at school, or head out for a hike well before a scooper would ever show up.
            Building a service around someone being home would mean missed visits, rescheduling
            headaches, and a lot of wasted trips up and down Signal Mountain and out to North
            Georgia. A no-contact model with gate photos and text confirmations solves that: you
            get proof the visit happened without having to plan your morning around it.
          </p>
          <p>
            It also means the service works just as well for renters, second homes, vacation
            rentals between guests, and property managers who are not on-site day to day. As long
            as we can safely reach the yard, we can service it.
          </p>

          <h2>Where We Service</h2>
          <p>
            Scoopy Doo serves Chattanooga and the surrounding area, including Hixson, Ooltewah,
            East Brainerd, Red Bank, East Ridge, Signal Mountain, Lookout Mountain, Soddy-Daisy,
            Collegedale, and Apison in Tennessee, plus Ringgold, Rossville, and Fort Oglethorpe in
            North Georgia. If you are not sure whether your address is covered, ask when you
            request a quote and we will confirm.
          </p>

          <h2>Frequently Asked Questions</h2>
          <p>
            <strong>Do I have to be home for dog poop removal service?</strong>
            <br />
            No. Scoopy Doo is a no-contact service. We let ourselves into the yard using the gate
            access you provide, scoop, and close the gate behind us, with a photo confirmation
            texted to you afterward.
          </p>
          <p>
            <strong>How will I know when the scooper has been there?</strong>
            <br />
            You get an on-the-way text before we arrive and a gate photo after the visit, so you
            always know your yard has been serviced without needing to be present.
          </p>
          <p>
            <strong>What if I forget to leave the gate open or share the code?</strong>
            <br />
            We will text you from the property instead of skipping the visit without notice, so
            you can send access instructions or reschedule.
          </p>
          <p>
            <strong>Is there a contract?</strong>
            <br />
            No. All plans are month-to-month with no long-term contract, and you can change your
            visit frequency or cancel at any time.
          </p>

          <p>
            Ready to stop thinking about the yard? Get a free, no-obligation quote at{' '}
            <a href="https://scoopychatt.com/quoterequest">scoopychatt.com/quoterequest</a> or
            call/text 423-600-5040.
          </p>

          <p>
            <Link to="/quoterequest">Request Your Free Quote</Link>
          </p>
        </article>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
};

export default NoContactPetWasteRemovalChattanooga;
