'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Car, Gauge, Calendar } from 'lucide-react';

interface Vehicle {
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
}

const FeaturedVehicles: React.FC = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        // Fetch all vehicles and filter for featured ones
        const response = await fetch('/api/vehicles');
        
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        
        const vehicles = await response.json();
        
        // Filter for featured vehicles
        const featured = vehicles.filter((vehicle: Vehicle) => vehicle.featured);
        
        setFeaturedVehicles(featured);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching featured vehicles:', err);
        setError('Failed to load featured vehicles');
        setIsLoading(false);
      }
    };

    fetchFeaturedVehicles();
  }, []);

  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <p>Loading featured vehicles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (featuredVehicles.length === 0) {
    return null; // Or render a "No featured vehicles" message
  }

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
                  src={imageErrors[vehicle.id] ? '/images/cars/car-placeholder.jpg' : (vehicle.image || '/images/cars/car-placeholder.jpg')}
                  alt={vehicle.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={() => handleImageError(vehicle.id)}
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