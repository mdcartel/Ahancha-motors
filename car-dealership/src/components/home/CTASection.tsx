'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-0 my-16 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/backgrounds/luxury-car-bg.jpg" 
          alt="Luxury Car" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/95 to-primary-700/95"></div>
      </div>
      
      {/* Diagonal design elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-500/20 -skew-x-12 transform origin-top-right"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center py-20">
          {/* Content area */}
          <div className="w-full md:w-2/3 text-white mb-10 md:mb-0 md:pr-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Visit our showroom today or browse our online inventory to start your journey toward the perfect vehicle for your lifestyle and needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md font-medium text-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors shadow-lg border-2 border-accent-500 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                View Inventory
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md font-medium text-lg bg-transparent text-white hover:bg-white/10 transition-colors shadow-lg border-2 border-white transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Visual element */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-white/20 rounded-full animate-pulse animation-delay-300"></div>
              <div className="absolute inset-10 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-primary-500 font-bold text-5xl">24/7</span>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-500 text-center mt-16">
                <span className="font-bold">Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-accent-500"></div>
    </section>
  );
};

export default CTASection;