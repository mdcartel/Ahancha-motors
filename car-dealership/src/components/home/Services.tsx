'use client';

import React from 'react';
import Link from 'next/link';
import { CarFront, Wrench, CreditCard, Search, CheckCircle, Settings } from 'lucide-react';

const services = [
  {
    id: 'sales',
    title: 'Vehicle Sales',
    description: 'Browse our extensive inventory of new, used, and certified pre-owned vehicles from top manufacturers.',
    icon: <CarFront size={40} />,
    link: '/inventory',
  },
  {
    id: 'maintenance',
    title: 'Service & Maintenance',
    description: 'Our factory-trained technicians provide expert maintenance and repair services for all makes and models.',
    icon: <Wrench size={40} />,
    link: '/services#maintenance',
  },
  {
    id: 'financing',
    title: 'Financing Options',
    description: 'Get pre-approved in minutes with competitive rates and flexible terms tailored to your budget.',
    icon: <CreditCard size={40} />,
    link: '/financing',
  },
  {
    id: 'trade-in',
    title: 'Trade-In Appraisal',
    description: 'Get a fair market value for your current vehicle and apply it toward your next purchase.',
    icon: <Search size={40} />,
    link: '/services#trade-in',
  },
  {
    id: 'warranty',
    title: 'Extended Warranty',
    description: 'Protect your investment with our comprehensive warranty programs for peace of mind.',
    icon: <CheckCircle size={40} />,
    link: '/services#warranty',
  },
  {
    id: 'parts',
    title: 'OEM Parts & Accessories',
    description: "Genuine manufacturer parts and custom accessories to enhance your vehicle's performance and appearance.",
    icon: <Settings size={40} />,
    link: '/services#parts',
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of automotive services to meet all your vehicle needs. From sales to service, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                href={service.link}
                className="text-primary hover:text-primary-dark font-medium flex items-center"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-md font-medium transition-colors inline-flex items-center"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;