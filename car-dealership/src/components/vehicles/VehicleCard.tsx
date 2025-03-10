'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, Gauge, Fuel, Cog } from 'lucide-react';

interface VehicleCardProps {
  vehicle: {
    id: string;
    title: string;
    make: string;
    model: string;
    trim?: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    exteriorColor: string;
    image: string;
    featured?: boolean;
    condition?: string;
  };
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image container with consistent aspect ratio */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={vehicle.image}
          alt={vehicle.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/cars/car-placeholder.jpg';
          }}
        />
        {vehicle.featured && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold py-1 px-3">
            Featured
          </div>
        )}
        {vehicle.condition && (
          <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-semibold py-1 px-3">
            {vehicle.condition}
          </div>
        )}
      </div>
      
      {/* Content section */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{vehicle.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Gauge size={14} className="mr-1" />
          <span>{vehicle.mileage.toLocaleString()} miles</span>
        </div>
        
        {/* Vehicle specs */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Cog size={14} className="mr-1 text-gray-400" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Fuel size={14} className="mr-1 text-gray-400" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Tag size={14} className="mr-1 text-gray-400" />
            <span>{vehicle.exteriorColor}</span>
          </div>
        </div>
        
        {/* Price and action button */}
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-xl font-bold text-red-600">${vehicle.price.toLocaleString()}</div>
          <Link
            href={`/inventory/${vehicle.id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;