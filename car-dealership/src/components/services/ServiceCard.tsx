'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Tag, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    category: string;
    price: string;
    image: string;
    duration: string;
    popular?: boolean;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Service Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/services/service-placeholder.jpg';
          }}
        />
        {service.popular && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-medium py-1 px-3">
            Popular
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
          <h3 className="text-lg font-bold text-white">{service.title}</h3>
        </div>
      </div>
      
      {/* Service Content */}
      <div className="p-4 flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center text-sm bg-gray-100 text-gray-700 rounded-full px-3 py-1">
            <Tag size={14} className="mr-1 text-red-600" />
            <span>{service.price}</span>
          </div>
          <div className="flex items-center text-sm bg-gray-100 text-gray-700 rounded-full px-3 py-1">
            <Clock size={14} className="mr-1 text-red-600" />
            <span>{service.duration}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
        
        <div className="mt-auto pt-3">
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            View Details
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;