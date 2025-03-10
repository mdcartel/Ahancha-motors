'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  };
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={vehicle.image}
          alt={vehicle.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
          // Use a fallback image if the vehicle image fails to load
          onError={(e) => {
            e.currentTarget.src = '/images/cars/car-placeholder.jpg';
          }}
        />
        {vehicle.featured && (
          <div className="absolute top-2 right-2 bg-accent text-white text-sm font-semibold py-1 px-2 rounded">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{vehicle.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{vehicle.mileage.toLocaleString()} miles</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <span>Transmission:</span>
            <span className="font-medium">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>Fuel:</span>
            <span className="font-medium">{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>Color:</span>
            <span className="font-medium">{vehicle.exteriorColor}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-primary">${vehicle.price.toLocaleString()}</span>
          <Link
            href={`/inventory/${vehicle.id}`}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;