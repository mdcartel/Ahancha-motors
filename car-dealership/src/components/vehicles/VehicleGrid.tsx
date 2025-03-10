'use client';

import React from 'react';
import VehicleCard from './VehicleCard';

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
  condition?: string;
  bodyType?: string;
}

interface VehicleGridProps {
  vehicles: Vehicle[];
  className?: string;
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ vehicles, className = '' }) => {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
        <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleGrid;