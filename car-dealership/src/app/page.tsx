import React from 'react';
import Hero from '@/components/home/Hero';
import SearchBar from '@/components/home/SearchBar';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Newsletter from '@/components/home/Newsletter';
import NewsletterSection from '@/components/home/NewsletterSection';

export const metadata = {
  title: 'Premium Auto Dealership | Find Your Dream Car',
  description: 'Discover your perfect vehicle at our dealership. Browse our extensive inventory of new, used, and certified pre-owned cars, trucks, and SUVs.',
}

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section with Search Bar Below */}
      <div className="relative">
        <Hero />
        <SearchBar />
      </div>

      {/* Main Content Sections */}
      <FeaturedVehicles />
      <Services />
      <Testimonials />
      <Newsletter />
      
      {/* High-Impact CTA Section */}
      <CTASection />
    </div>
  );
}