'use client';

import React, { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import SearchBar from '@/components/home/SearchBar';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import Newsletter from '@/components/home/Newsletter';

// This is the content that will be wrapped in Suspense
function HomeContent() {
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

// This is the main page component with Suspense
export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}