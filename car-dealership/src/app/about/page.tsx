import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import HistorySection from '@/components/about/HistorySection';
import MissionSection from '@/components/about/MissionSection';
import TeamSection from '@/components/about/TeamSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export const metadata: Metadata = {
  title: 'About Us | Premium Auto Dealership',
  description: 'Learn about Premium Auto Dealership\'s history, our mission, and the team dedicated to exceptional customer service.',
};

export default function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image 
            src="/images/backgrounds/mar.png" 
            alt="Premium Auto Dealership" 
            fill 
            className="object-cover xl:object-left"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
              About Premium Auto
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Your Trusted Partner in Automotive Excellence</h1>
            <p className="text-lg text-gray-300">
              For over two decades, we've been helping customers find their perfect vehicles with honesty, 
              integrity, and exceptional service.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Premium Auto</h2>
          <p className="text-lg text-gray-700 mb-4">
            Premium Auto Dealership is a family-owned business dedicated to providing exceptional vehicles 
            and outstanding customer service. Since our founding in 2002, we've helped thousands of customers 
            find their perfect vehicle match while building a reputation for honesty, integrity, and automotive expertise.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our dealership offers a wide selection of new, used, and certified pre-owned vehicles from top manufacturers. 
            We also provide comprehensive services including financing, maintenance, and repairs - everything you need 
            throughout your vehicle ownership journey.
          </p>
          <p className="text-lg text-gray-700">
            What sets us apart is our commitment to building long-term relationships with our customers. We believe 
            in transparent pricing, no-pressure sales, and going above and beyond to ensure your complete satisfaction.
          </p>
        </div>

        {/* History Section */}
        <HistorySection />

        {/* Mission Section */}
        <MissionSection />

        {/* Team Section */}
        <TeamSection />

        {/* Awards & Recognition */}
        <div className="max-w-5xl mx-auto my-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized throughout the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Award Item 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Satisfaction Excellence</h3>
              <p className="text-gray-600">Top-rated dealership in customer satisfaction for 5 consecutive years</p>
            </div>

            {/* Award Item 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Service Department</h3>
              <p className="text-gray-600">Recognized for exceptional maintenance and repair services</p>
            </div>

            {/* Award Item 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Services Award</h3>
              <p className="text-gray-600">Industry recognition for transparent and customer-friendly financing options</p>
            </div>

            {/* Award Item 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Impact Award</h3>
              <p className="text-gray-600">Recognized for our contributions and community involvement initiatives</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-900 text-white py-16 my-12 rounded-lg">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what some of our valued customers have to say about their experience with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-800 rounded-lg p-6 relative">
                <svg className="absolute top-6 left-6 h-10 w-10 text-red-600/20" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <div className="relative z-10">
                  <p className="text-gray-300 mb-4">
                    "Premium Auto made buying my new car a breeze. Their staff was knowledgeable, friendly, and 
                    never pushy. I got a great deal and couldn't be happier with my purchase."
                  </p>
                  <div className="font-medium">
                    <p className="text-white">Sarah J.</p>
                    <p className="text-gray-400 text-sm">Satisfied Customer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-800 rounded-lg p-6 relative">
                <svg className="absolute top-6 left-6 h-10 w-10 text-red-600/20" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <div className="relative z-10">
                  <p className="text-gray-300 mb-4">
                    "I've been bringing my vehicles to Premium Auto for service for years. Their technicians are top-notch, 
                    and they always explain everything clearly. I wouldn't go anywhere else."
                  </p>
                  <div className="font-medium">
                    <p className="text-white">Michael T.</p>
                    <p className="text-gray-400 text-sm">Loyal Customer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-800 rounded-lg p-6 relative">
                <svg className="absolute top-6 left-6 h-10 w-10 text-red-600/20" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <div className="relative z-10">
                  <p className="text-gray-300 mb-4">
                    "The financing team at Premium Auto worked miracles for me. They found a loan option that fit my budget 
                    perfectly. The whole process was smooth and transparent."
                  </p>
                  <div className="font-medium">
                    <p className="text-white">Jennifer K.</p>
                    <p className="text-gray-400 text-sm">First-time Buyer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NewsletterSection />
        {/* CTA Section */}
        <div className="max-w-5xl mx-auto text-center mt-16 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience the Premium Auto Difference?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Visit our dealership today to explore our extensive inventory and meet our friendly team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/inventory" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors">
              Browse Inventory
            </a>
            <a href="/contact" className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow-md transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}