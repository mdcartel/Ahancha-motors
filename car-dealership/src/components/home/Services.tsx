'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wrench, Sparkles, Hammer, ShieldCheck, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  // Service card data
  const services = [
    {
      id: 1,
      icon: <Wrench size={24} className="text-red-600" />,
      title: 'Maintenance',
      description: 'Regular service to keep your vehicle running at its best with certified technicians.',
      link: '/services/maintenance'
    },
    {
      id: 2,
      icon: <Hammer size={24} className="text-red-600" />,
      title: 'Repairs',
      description: 'Expert diagnostic and repair services for all makes and models.',
      link: '/services/repairs'
    },
    {
      id: 3,
      icon: <Sparkles size={24} className="text-red-600" />,
      title: 'Detailing',
      description: 'Premium detailing services to keep your vehicle looking showroom new.',
      link: '/services/detailing'
    },
    {
      id: 4,
      icon: <ShieldCheck size={24} className="text-red-600" />,
      title: 'Extended Warranty',
      description: 'Protect your investment with our comprehensive warranty options.',
      link: '/services/warranty'
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-red-600/10 rounded-full text-red-600 font-medium text-sm mb-3">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Complete Automotive Services
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            We offer a full range of services to meet all your automotive needs, from regular maintenance to comprehensive repairs.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow p-5">
              <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                href={service.link}
                className="inline-flex items-center text-red-600 font-medium group-hover:text-red-700 transition-colors"
              >
                Learn more
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Service banner */}
        <div className="mt-10 relative overflow-hidden rounded-lg bg-gray-900 shadow-xl">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/cars/cx51.png"
              alt="Service Center"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 px-6 py-12 md:py-16 md:px-12 text-center md:text-left">
            <div className="md:max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                State-of-the-Art Service Center
              </h2>
              <p className="text-gray-300 mb-6 md:text-lg">
                Our certified technicians use the latest diagnostic equipment and genuine parts to keep your vehicle running at its best.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/services"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-md inline-flex items-center"
                >
                  View All Services
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-white/20 inline-flex items-center"
                >
                  Schedule Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Service features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Express Service</h3>
            <p className="text-gray-600">
              Quick turnaround on routine maintenance like oil changes, tire rotations, and inspections.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">
              All repairs and services are backed by our comprehensive workmanship guarantee.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Service Advisors</h3>
            <p className="text-gray-600">
              Dedicated advisors to explain services, provide estimates, and keep you informed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;