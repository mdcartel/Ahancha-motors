'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative z-10 hero-section">
      {/* Background Image with Overlay */}
      <div className="relative h-[600px] md:h-[650px] bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/backgrounds/hero-background.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-black/70"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 pb-36 md:pb-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect Drive
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-xl">
              Discover exceptional vehicles at Premium Auto Dealership. We offer a wide selection of new and pre-owned cars with personalized financing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/inventory"
                className="bg-accent hover:bg-accent-dark text-white py-3 px-8 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Browse Inventory
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                href="/contact"
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white py-3 px-8 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Schedule Test Drive
              </Link>
            </div>
          </div>
        </div>
        
        {/* Trending Section at Bottom (Optional) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-white font-medium mr-2">Trending:</span>
              <Link href="/inventory?make=toyota" className="bg-white/10 hover:bg-white/20 text-white text-sm py-1 px-3 rounded-full transition">
                Toyota SUVs
              </Link>
              <Link href="/inventory?body=truck" className="bg-white/10 hover:bg-white/20 text-white text-sm py-1 px-3 rounded-full transition">
                Pickup Trucks
              </Link>
              <Link href="/inventory?features=ev" className="bg-white/10 hover:bg-white/20 text-white text-sm py-1 px-3 rounded-full transition">
                Electric Vehicles
              </Link>
              <Link href="/inventory?price=under-30000" className="bg-white/10 hover:bg-white/20 text-white text-sm py-1 px-3 rounded-full transition">
                Under $30,000
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;