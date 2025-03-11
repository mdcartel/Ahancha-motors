import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import ServiceList from '@/components/services/ServiceList';

export const metadata: Metadata = {
  title: 'Automotive Services | Premium Auto Dealership',
  description: 'Professional automotive services including maintenance, repairs, detailing, and more. Factory-trained technicians and genuine parts for all makes and models.',
};

export default function ServicesPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
<div className="relative bg-gray-900 text-white">
                <div className="absolute inset-0 z-0 opacity-30">
                  <Image 
                    src="/images/backgrounds/services.png" 
                    alt="Premium Auto Dealership" 
                    fill 
                    className="object-cover xl:object-left"
                    priority
                  />
                </div>
                <div className="relative z-10 container mx-auto px-4 py-20">
                  <div className="max-w-3xl">
                    <div className="inline-block px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
                      Services
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Complete Automotive Services</h1>
                    <p className="text-lg text-gray-300">
                    Expert care for your vehicle throughout its lifetime.
                    </p>
                  </div>
                </div>
              </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Introduction Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Center Excellence</h2>
            <p className="text-gray-700 mb-4">
              At Premium Auto Dealership, we're committed to keeping your vehicle running at its best throughout its lifetime. 
              Our state-of-the-art service center is staffed by factory-trained technicians who understand the intricacies of 
              all makes and models. We use the latest diagnostic equipment and genuine parts to ensure quality repairs and maintenance.
            </p>
            <p className="text-gray-700">
              Whether you need routine maintenance, complex repairs, or customization services, our team is here to provide 
              exceptional care with transparent pricing and efficient service. Schedule your appointment online or contact 
              our service advisors today.
            </p>
          </div>

          {/* Service List Component */}
          <ServiceList />

          {/* Service Advantages */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Premium Auto Service Advantage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Technicians</h3>
                <p className="text-gray-600">
                  Our factory-trained technicians receive continuous education to stay current with the latest automotive technologies.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Efficient Service</h3>
                <p className="text-gray-600">
                  We respect your time and strive to complete all services promptly without compromising quality.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                <p className="text-gray-600">
                  We provide detailed estimates before work begins and explain all recommended services clearly.
                </p>
              </div>
            </div>
          </div>
          
          {/* Maintenance Plans */}
        
          {/* Appointment CTA */}
          <div className="bg-gray-900 text-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Schedule Your Service Appointment</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our factory-trained technicians are ready to provide the expert care your vehicle deserves.
              Schedule online for convenient service at a time that works for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/services/schedule" 
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors"
              >
                Schedule Service
              </a>
              <a 
                href="/contact" 
                className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-lg shadow-md transition-colors"
              >
                Contact Service Department
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
