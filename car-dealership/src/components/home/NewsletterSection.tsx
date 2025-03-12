'use client';

import React from 'react';
import Newsletter from '@/components/home/Newsletter';
import { Car, Bell, Tag } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stay Updated with Premium Auto</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Subscribe to our newsletter for the latest inventory updates, special promotions, and automotive insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
                <Car size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">New Inventory Alerts</h3>
              <p className="text-gray-600">
                Be the first to know when new vehicles arrive at our dealership, so you never miss your dream car.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
                <Tag size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusive Offers</h3>
              <p className="text-gray-600">
                Receive special promotions and discounts available only to our newsletter subscribers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
                <Bell size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Event Invitations</h3>
              <p className="text-gray-600">
                Get invited to exclusive events, test drives, and special showcases at our dealership.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Newsletter</h3>
                <p className="text-gray-600 mb-6">
                  Sign up now and get a <span className="font-semibold text-red-600">free vehicle valuation</span> on your current car when you visit our dealership.
                </p>
                
                {/* Newsletter Component */}
                <Newsletter variant="embedded" />
              </div>
              
              <div className="bg-red-600 p-8 md:p-12 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Why Subscribe?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>First access to new inventory</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Exclusive subscriber-only discounts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Automotive maintenance tips</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Seasonal service reminders</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Industry news and insights</span>
                  </li>
                </ul>
                <p className="mt-6 text-sm">
                  You can unsubscribe at any time. We respect your privacy and will never share your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;