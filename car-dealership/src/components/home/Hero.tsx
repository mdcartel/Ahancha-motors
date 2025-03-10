'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative z-10 hero-section">
      {/* Background Image with Dark Blue Overlay */}
      <div className="relative h-[600px] md:h-[650px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/backgrounds/hero-background.jpg')",
          }}
        >
          {/* Dark navy blue overlay similar to image 2 */}
          <div className="absolute inset-0 bg-primary-500/90"></div>
        </div>
        
        {/* Hero Content - Styled like image 2 */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 pb-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect Drive
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Discover exceptional vehicles at Premium Auto Dealership.
              We offer a wide selection of new and pre-owned cars with
              personalized financing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-md font-medium bg-accent-500 text-white hover:bg-accent-600 transition-colors shadow-md"
              >
                Browse Inventory
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-md font-medium bg-white text-primary-500 hover:bg-gray-100 transition-colors shadow-md"
              >
                Schedule Test Drive
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;