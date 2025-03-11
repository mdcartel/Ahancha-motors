'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Phone, ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Main CTA Box */}
        <div className="rounded-lg overflow-hidden bg-gray-900 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative h-64 md:h-auto">
              <Image
                src="/images/cars/cx5.png"
                alt="Luxury Car"
                fill
                className="object-cover"
              />
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
              
              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">Drive with Confidence</h3>
                <p className="text-white/90 text-lg max-w-xs drop-shadow-md">Premium vehicles with exceptional service and support</p>
              </div>
            </div>
            
            {/* Right side - CTA content */}
            <div className="p-6 md:p-10 bg-gray-900 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Vehicle?</h2>
              
              <p className="text-gray-300 mb-6">
                Schedule a test drive today or contact our team for personalized assistance with your vehicle search.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-600/20 rounded-full mt-1">
                    <Calendar size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Test Drive</h4>
                    <p className="text-sm text-gray-400">Schedule at your convenience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-600/20 rounded-full mt-1">
                    <Phone size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Call Us</h4>
                    <p className="text-sm text-gray-400">+2547 9628-0700</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors shadow-md"
                >
                  Schedule Test Drive
                </Link>
                
                <Link
                  href="/inventory"
                  className="inline-flex justify-center items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded border border-white/20 transition-colors"
                >
                  Browse Inventory
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Three feature boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Box 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Protection</h3>
            <p className="text-gray-600">Extended warranty options to keep you covered long after your purchase.</p>
          </div>
          
          {/* Box 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Financing</h3>
            <p className="text-gray-600">Customized financing solutions to fit your budget and credit situation.</p>
          </div>
          
          {/* Box 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Concierge Service</h3>
            <p className="text-gray-600">Complimentary vehicle delivery and personalized customer support.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;