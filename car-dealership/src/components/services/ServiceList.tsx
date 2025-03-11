'use client';

import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import { Filter, Search, X } from 'lucide-react';

const services = [
  {
    id: 'oil-change',
    title: 'Oil Change Service',
    description: 'Regular oil changes keep your engine running smoothly and extend its life. Our technicians use premium oils and filters.',
    category: 'maintenance',
    price: 'From $39.95',
    image: '/images/services/oil-change.png',
    duration: '30-45 min',
    popular: true
  },
  {
    id: 'brake-service',
    title: 'Brake Service & Repair',
    description: 'Ensure your safety with our comprehensive brake inspection and repair services, from pad replacement to complete system overhauls.',
    category: 'repairs',
    price: 'From $149.95',
    image: '/images/services/brake-service.png',
    duration: '1-3 hours',
    popular: true
  },
  {
    id: 'tire-service',
    title: 'Tire Services',
    description: 'From rotations to replacements, our tire services ensure optimal traction, fuel efficiency, and safety for your vehicle.',
    category: 'maintenance',
    price: 'From $24.95',
    image: '/images/services/tire-service.png',
    duration: '30-60 min',
    popular: true
  },
  {
    id: 'battery-service',
    title: 'Battery Testing & Replacement',
    description: 'Don\'t get stranded with a dead battery. Our technicians will test your battery health and replace it if necessary.',
    category: 'maintenance',
    price: 'From $29.95',
    image: '/images/services/battery-service.png',
    duration: '30 min',
    popular: false
  },
  {
    id: 'ac-service',
    title: 'A/C Service & Repair',
    description: 'Keep cool with our air conditioning service. We check for leaks, recharge refrigerant, and ensure optimal cooling performance.',
    category: 'repairs',
    price: 'From $89.95',
    image: '/images/services/ac-service.png',
    duration: '1-2 hours',
    popular: false
  },
  {
    id: 'wheel-alignment',
    title: 'Wheel Alignment',
    description: 'Proper wheel alignment improves handling, extends tire life, and increases fuel efficiency by ensuring your tires make optimal contact with the road.',
    category: 'maintenance',
    price: 'From $79.95',
    image: '/images/services/wheel-alignment.png',
    duration: '45-60 min',
    popular: false
  },
  {
    id: 'detailing',
    title: 'Premium Detailing',
    description: 'Restore your vehicle\'s showroom shine with our comprehensive detailing services, from express packages to full interior and exterior treatments.',
    category: 'detailing',
    price: 'From $129.95',
    image: '/images/services/detailing.png',
    duration: '2-4 hours',
    popular: true
  },
  {
    id: 'diagnostic',
    title: 'Advanced Diagnostics',
    description: 'Using state-of-the-art equipment, our technicians can identify and troubleshoot complex issues affecting your vehicle\'s performance.',
    category: 'repairs',
    price: 'From $99.95',
    image: '/images/services/diagnostic.png',
    duration: '1 hour',
    popular: false
  },
  {
    id: 'transmission',
    title: 'Transmission Service',
    description: 'Maintain your transmission\'s performance and longevity with our comprehensive service, including fluid exchange and system inspection.',
    category: 'maintenance',
    price: 'From $149.95',
    image: '/images/services/transmission.png',
    duration: '1-2 hours',
    popular: false
  },
  {
    id: 'electrical',
    title: 'Electrical System Repair',
    description: 'From battery issues to complex electrical problems, our technicians have the expertise to diagnose and repair your vehicle\'s electrical systems.',
    category: 'repairs',
    price: 'From $89.95',
    image: '/images/services/electrical.png',
    duration: 'Varies',
    popular: false
  },
  {
    id: 'suspension',
    title: 'Suspension & Steering',
    description: 'Restore your vehicle\'s ride comfort and handling with our suspension and steering services, including shock/strut replacement and steering adjustments.',
    category: 'repairs',
    price: 'From $149.95',
    image: '/images/services/suspension.png',
    duration: '1-3 hours',
    popular: false
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating',
    description: 'Protect your vehicle\'s paint with our professional ceramic coating service, providing long-lasting shine and protection against environmental damage.',
    category: 'detailing',
    price: 'From $699.95',
    image: '/images/services/ceramic-coating.png',
    duration: '1-2 days',
    popular: false
  }
];

const ServiceList = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter services based on active category and search term
  const filteredServices = services.filter(service => {
    // Category filter
    if (activeCategory && service.category !== activeCategory) {
      return false;
    }
    
    // Search filter
    if (searchTerm && !service.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        && !service.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Get unique categories
  const categories = [...new Set(services.map(service => service.category))];

  return (
    <div className="mb-12">
      {/* Filter and Search Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2 sm:w-auto w-full">
          <Filter className="text-gray-700 h-5 w-5" />
          <span className="text-gray-700 font-medium">Filter:</span>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                activeCategory === null
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-full capitalize ${
                  activeCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative sm:ml-auto sm:w-64 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Popular Services Section (when no filters applied) */}
      {!activeCategory && !searchTerm && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter(service => service.popular)
              .map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        </div>
      )}

      {/* All Services or Filtered Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {activeCategory 
            ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Services` 
            : searchTerm ? 'Search Results' : 'All Services'}
        </h2>
        
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setActiveCategory(null);
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;