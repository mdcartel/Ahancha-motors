'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Car, Gauge, Calendar } from 'lucide-react';

// This would typically come from an API call
const featuredVehicles = [
  {
    id: '1',
    title: '2023 Toyota Camry XSE',
    make: 'Toyota',
    model: 'Camry',
    trim: 'XSE',
    year: 2023,
    price: 32995,
    mileage: 12560,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    exteriorColor: 'Pearl White',
    image: '/images/cars/toyota-camry.jpg',
    featured: true,
  },
  {
    id: '2',
    title: '2022 Honda Accord Sport',
    make: 'Honda',
    model: 'Accord',
    trim: 'Sport',
    year: 2022,
    price: 28995,
    mileage: 18750,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    exteriorColor: 'Modern Steel',
    image: '/images/cars/honda-accord.jpg',
    featured: true,
  },
  {
    id: '3',
    title: '2023 Ford F-150 Lariat',
    make: 'Ford',
    model: 'F-150',
    trim: 'Lariat',
    year: 2023,
    price: 45995,
    mileage: 5230,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    exteriorColor: 'Agate Black',
    image: '/images/cars/ford-f150.jpg',
    featured: true,
  },
  {
    id: '4',
    title: '2022 BMW X5 xDrive40i',
    make: 'BMW',
    model: 'X5',
    trim: 'xDrive40i',
    year: 2022,
    price: 59995,
    mileage: 15680,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    exteriorColor: 'Alpine White',
    image: '/images/cars/bmw-x5.jpg',
    featured: true,
  },
];

const FeaturedVehicles: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Vehicles</h2>
            <p className="text-gray-600 max-w-2xl">Explore our hand-selected premium vehicles with exceptional value and condition.</p>
          </div>
          <Link 
            href="/inventory" 
            className="mt-4 md:mt-0 text-primary-500 hover:text-primary-600 flex items-center font-medium transition-colors"
          >
            View All Vehicles <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="card group">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                <Image
                  src={vehicle.image}
                  alt={vehicle.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/cars/car-placeholder.jpg';
                  }}
                />
                {vehicle.featured && (
                  <div className="absolute top-3 right-3 bg-accent-500 text-white text-sm font-semibold py-1 px-3 rounded-full">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/90 text-primary-500 rounded-full py-1 px-3 text-xs font-medium flex items-center">
                    <Calendar size={14} className="mr-1" /> {vehicle.year}
                  </span>
                  <span className="bg-white/90 text-primary-500 rounded-full py-1 px-3 text-xs font-medium flex items-center">
                    <Gauge size={14} className="mr-1" /> {vehicle.mileage.toLocaleString()} mi
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                  {vehicle.title}
                </h3>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Car size={16} className="mr-1 text-primary-500" />
                    <span>{vehicle.make} {vehicle.model}</span>
                  </div>
                  <span className="text-gray-600 text-sm">{vehicle.transmission}</span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xl font-bold text-primary-600">${vehicle.price.toLocaleString()}</span>
                  <Link
                    href={`/inventory/${vehicle.id}`}
                    className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;