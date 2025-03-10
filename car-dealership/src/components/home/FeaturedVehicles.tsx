'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import VehicleCard from '@/components/vehicles/VehicleCard';

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
          <Link 
            href="/inventory" 
            className="text-primary hover:text-primary-dark flex items-center transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;