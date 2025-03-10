'use client';

import React from 'react';
import Link from 'next/link';

const CTASection: React.FC = () => {
  return (
    <section className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Visit our showroom today or browse our online inventory to start your journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/inventory"
            className="bg-accent hover:bg-accent-dark text-white py-3 px-8 rounded-md font-medium transition-colors inline-flex items-center justify-center"
          >
            View Inventory
          </Link>
          <Link
            href="/contact"
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white py-3 px-8 rounded-md font-medium transition-colors inline-flex items-center justify-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;