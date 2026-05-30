import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogPostTemplate from '@/components/BlogPostTemplate.jsx';

export default function BlogSoddyDaisyPage() {
  return (
    <>
      <Helmet>
        <title>Chattanooga, Tennessee Pet Waste Removal</title>
        <meta name='description' content='Chattanooga, Tennessee Pet Waste Removal' />
      </Helmet>
      <BlogPostTemplate 
        title="Pet Waste Removal in Soddy Daisy"
        description="Discover reliable and affordable pet waste removal services in Soddy Daisy, TN with Scoopy Chatt."
        date="March 20, 2026"
        author="Brandon Carter"
        content={
          <>
            <p>Soddy Daisy residents love their outdoor spaces and their pets. But combining the two often leads to a messy yard. Scoopy Chatt is proud to offer dedicated pet waste removal services throughout the Soddy Daisy area.</p>
            <h2>Reliable Service You Can Count On</h2>
            <p>We know that reliability is key when hiring a home service provider. Our technicians arrive on schedule, fully equipped to clean your yard thoroughly. We securely bag all waste and dispose of it properly, leaving your Soddy Daisy property spotless.</p>
            <h2>Affordable Plans for Every Household</h2>
            <p>Whether you have one small dog or a pack of large breeds, we offer affordable, customizable plans. Our weekly and twice-weekly services are incredibly popular among Soddy Daisy families who want to maintain a clean, odor-free environment year-round.</p>
            <p>Reclaim your backyard today. Contact Scoopy Chatt for a free quote and experience the best pet waste removal service in Soddy Daisy.</p>
          </>
        }
      />
    </>
  );
}