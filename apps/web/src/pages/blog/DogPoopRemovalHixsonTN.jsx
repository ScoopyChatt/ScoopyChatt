import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { getCanonicalUrl } from '@/utils/seoHelpers';

const linkClass = 'text-orange-700 underline font-semibold';

const DogPoopRemovalHixsonTN = () => {
  const canonicalUrl = getCanonicalUrl('/blog/dog-poop-removal-hixson-tn');

  return (
    <>
      <Helmet>
        <title>Dog Poop Removal in Hixson, TN | Scoopy Doo Pet Waste Removal</title>
        <meta name="description" content="Weekly dog poop removal in Hixson, TN from $20 a visit. Scoopy Doo cleans wooded and leaf-covered yards across Hixson and Middle Valley. No contracts." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-3xl font-bold mb-6">
            Dog Poop Removal in Hixson, TN: Keeping Wooded Yards Clean This Fall
          </h1>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Hixson yards are great for dogs. They are tough to keep clean.</h2>
          <p className="mb-4">
            If you live in Hixson, you probably picked your home for the yard. Bigger lots, mature
            trees, and room for the dogs to run. From Middle Valley to the neighborhoods off Hixson
            Pike and Highway 153, a lot of Hixson backyards back right up to the woods.
          </p>
          <p className="mb-4">
            That is exactly what makes dog poop so hard to keep up with here. Under tree lines, along
            fences, and in the shade, waste is easy to miss and easy to step in. And right now, with
            fall leaves coming down, it gets buried completely.
          </p>
          <p className="mb-4">
            Scoopy Doo is a locally owned, full-time pet waste removal company, and Hixson is one of
            our regular routes. Here is what we see in Hixson yards, and how we handle it.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Why fall is the hardest time to keep a Hixson yard clean</h2>
          <p className="mb-4">
            Leaves hide everything. A yard that looks clean from the back porch in October can have
            weeks of dog waste hiding under the leaf cover. Then you rake, mow, or mulch, and you find
            it the hard way.
          </p>
          <p className="mb-4">
            Waste left under wet leaves also breaks down slowly and keeps smelling. When the leaves
            finally come up, you are dealing with all of it at once.
          </p>
          <p className="mb-4">
            That is why we walk every yard in a grid pattern instead of just scanning it. Our techs
            check under leaves, along fence lines, and back into the tree line, so nothing gets skipped
            just because it is hidden.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Protecting Chickamauga Lake starts in your backyard</h2>
          <p className="mb-4">
            Hixson sits along the Tennessee River and Chickamauga Lake. A lot of us spend summer
            weekends at Chester Frost Park or out on the water.
          </p>
          <p className="mb-4">
            Dog waste left in the yard does not just stay in the yard. When it rains, it washes into
            storm drains and creeks that drain toward the lake, carrying bacteria and parasites with
            it. Picking it up every week is one of the simplest things a Hixson dog owner can do to
            help keep that water clean.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">What our Hixson customers say</h2>
          <blockquote className="border-l-4 border-orange-300 pl-4 italic mb-4">
            <p>&ldquo;We’ve been using Scoppy Doo for about a year. They do an amazing job and make my life so much easier. Easy to make an appointment. Showed up on time and completed the job.&rdquo;</p>
            <footer className="not-italic text-sm mt-1">Nancy H., Hixson (5-star Google review)</footer>
          </blockquote>
          <blockquote className="border-l-4 border-orange-300 pl-4 italic mb-4">
            <p>&ldquo;They came in the rain and did a great job cleaning my backyard. They were communicative and delivered on what they promised I highly recommend Scoopy Doo&rdquo;</p>
            <footer className="not-italic text-sm mt-1">Audra J., Hixson (5-star Google review)</footer>
          </blockquote>

          <h2 className="text-2xl font-semibold mt-8 mb-3">What every Hixson visit includes</h2>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>A text when we are on the way</li>
            <li>A full grid-pattern sweep of your yard, including wooded edges and leaf cover</li>
            <li>Waste double-bagged and placed in your outdoor bin, or hauled away for $5 a visit</li>
            <li>Your gate secured and a photo sent to your phone when we finish</li>
            <li>Tools sanitized between every yard</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-3">How much does dog poop removal cost in Hixson?</h2>
          <p className="mb-2">Hixson homes pay the same rates as the rest of our service area:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Weekly service: from $20 per visit</li>
            <li>Twice-weekly service: from $18 per visit</li>
            <li>Every-other-week service: from $33 per visit</li>
            <li>One-time yard cleanup: from $85</li>
          </ul>
          <p className="mb-4">
            Final pricing depends on yard size and number of dogs. There are no contracts, and you can
            pause or cancel anytime. You can get your exact price in about a minute on our{' '}
            <Link className={linkClass} to="/quote">instant quote page</Link>, or see{' '}
            <Link className={linkClass} to="/pricing">full pricing</Link>.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Weekly or every other week?</h2>
          <p className="mb-4">
            For most Hixson homes with one or two dogs, weekly service is the sweet spot. It keeps the
            yard usable every day and keeps waste from piling up under leaves. If you have one small dog
            or a smaller yard, every other week can work. If you have three or more dogs, twice weekly
            keeps things under control.
          </p>
          <p className="mb-4">
            If your yard has gotten away from you, start with a{' '}
            <Link className={linkClass} to="/one-time-cleanup">one-time cleanup</Link> and then move to a
            regular schedule.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Frequently asked questions</h2>
          <h3 className="text-xl font-semibold mt-6 mb-2">Do you service all of Hixson?</h3>
          <p className="mb-4">
            Yes. We run regular routes throughout Hixson (ZIP 37343), including Middle Valley, the
            Hixson Pike corridor, the Highway 153 corridor, and the Thrasher Pike area. We also serve
            nearby Harrison,{' '}
            <Link className={linkClass} to="/service/soddy-daisy">Soddy-Daisy</Link>, and{' '}
            <Link className={linkClass} to="/service/red-bank">Red Bank</Link>.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Can you clean wooded or sloped yards?</h3>
          <p className="mb-4">
            Yes. Many Hixson yards back up to the woods, and we clean them all the time. Our
            grid-pattern sweep covers tree lines, fence lines, and leaf-covered areas.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Do I need to be home?</h3>
          <p className="mb-4">
            No. Just leave the gate unlocked or let us know the code. We text when we are on the way and
            send a photo of your closed gate when we are done.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">How soon can you start?</h3>
          <p className="mb-4">
            Most new Hixson customers can be added to a route within a few days of getting a quote.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Get your Hixson yard back</h2>
          <p className="mb-2">
            Spend your weekends enjoying your yard, not cleaning it. Get your instant price on our{' '}
            <Link className={linkClass} to="/service/hixson">Hixson service page</Link> or{' '}
            <Link className={linkClass} to="/quote">quote page</Link>, or call or text{' '}
            <a className={linkClass} href="tel:4236005040">423-600-5040</a>.
          </p>
        </article>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
};

export default DogPoopRemovalHixsonTN;
