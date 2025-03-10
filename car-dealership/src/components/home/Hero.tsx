'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const keyBenefits = [
    "Premium Selection",
    "Expert Financing Options",
  ];

  return (
    <section className="relative z-10 overflow-hidden bg-gray-900">
      {/* Shorter height container */}
      <div className="relative min-h-[500px] md:min-h-[550px] flex items-center">
        {/* Main background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/hero-car-bg.jpg"
            alt="Luxury cars"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/90"></div>
        </div>
        
        {/* Subtle accent elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute right-1/4 top-1/3 w-48 h-48 border border-accent-500/10 rounded-full"></div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left column - Text content */}
            <div className="text-white">
              <div className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white mb-4">
                <span className="text-sm font-semibold tracking-wide">Luxury Auto Experience</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight text-white">
                Drive Your <span className="text-red-500">Dreams</span> <span className="text-white">Home Today</span>
              </h1>
              
              <p className="text-white text-lg mb-6 max-w-lg leading-relaxed">
                Discover exceptional vehicles with premium features and unmatched performance.
                Our personalized approach ensures you find the perfect match for your lifestyle.
              </p>
              
              {/* Benefits list with improved icons - horizontal layout */}
              <ul className="mb-6 flex flex-wrap gap-4">
                {keyBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 bg-white/10 pl-2 pr-4 py-1.5 rounded-lg">
                    <div className="bg-red-600 p-1 rounded-full">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} size={16} fill="#FFC107" color="#FFC107" />
                  ))}
                </div>
                <span className="text-white text-sm">4.9/5 from over 200+ reviews</span>
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/inventory"
                  className="px-6 py-3 rounded-lg bg-red-600 text-white text-center font-medium transition-all shadow-md hover:bg-red-700"
                >
                  <span className="flex items-center justify-center">
                    Explore Inventory
                    <ArrowRight size={16} className="ml-2" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-lg bg-white/10 text-white text-center font-medium hover:bg-white/20 transition-all"
                >
                  Schedule Test Drive
                </Link>
              </div>
            </div>
            
            {/* Right column - Car showcase */}
            <div className="hidden lg:block relative">
              {/* Main showcase car */}
              <div className="relative">
                <Image
                  src="/images/cars/maz.png"
                  alt="Featured luxury car"
                  width={600}
                  height={350}
                  className="object-contain"
                />
              </div>
              
              {/* Car specs card */}
              <div className="absolute bottom-4 -left-4 bg-white/15 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-lg">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-white">
                    <p className="text-xs opacity-80">Engine</p>
                    <p className="text-sm font-medium">3.0L Turbo</p>
                  </div>
                  <div className="text-white">
                    <p className="text-xs opacity-80">0-60 mph</p>
                    <p className="text-sm font-medium">4.8s</p>
                  </div>
                  <div className="text-white">
                    <p className="text-xs opacity-80">Efficiency</p>
                    <p className="text-sm font-medium">28/34 MPG</p>
                  </div>
                  <div className="text-white">
                    <p className="text-xs opacity-80">Drive</p>
                    <p className="text-sm font-medium">AWD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;