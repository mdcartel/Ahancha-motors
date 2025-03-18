'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Calendar, 
  Gauge, 
  Fuel, 
  Cog, 
  Palette, 
  Tag, 
  Hash, 
  Car,
  Award,
  CheckCircle
} from 'lucide-react';

// Dynamically import client components
const VehicleGallery = dynamic(() => import('@/components/vehicles/VehicleGallery'), {
  loading: () => <div className="aspect-video bg-gray-200 animate-pulse"></div>
});

const VehicleFeatures = dynamic(() => import('@/components/vehicles/VehicleFeatures'), {
  loading: () => <div className="bg-gray-100 p-4 animate-pulse"></div>
});

const VehicleSpecs = dynamic(() => import('@/components/vehicles/VehicleSpecs'), {
  loading: () => <div className="bg-gray-100 p-4 animate-pulse"></div>
});

const VehicleContact = dynamic(() => import('@/components/vehicles/VehicleContact'), {
  loading: () => <div className="bg-gray-100 p-4 animate-pulse"></div>
});

interface ClientVehicleComponentsProps {
  vehicle: any;
  similarVehicles: any[];
}

const ClientVehicleComponents: React.FC<ClientVehicleComponentsProps> = ({ 
  vehicle, 
  similarVehicles 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
          <VehicleGallery 
            images={vehicle.images || [vehicle.image || '/images/cars/car-placeholder.jpg']} 
            title={vehicle.title} 
          />
        </div>
        
        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vehicle</h2>
          <p className="text-gray-700 whitespace-pre-line">{vehicle.description || 'No description available for this vehicle.'}</p>
        </div>
        
        {/* Vehicle Features */}
        {vehicle.features && vehicle.features.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Options</h2>
            <VehicleFeatures features={vehicle.features} />
          </div>
        )}
        
        {/* Vehicle Specifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VehicleSpecs
              specs={[
                { label: 'Make', value: vehicle.make, icon: <Car size={18} /> },
                { label: 'Model', value: vehicle.model, icon: <Car size={18} /> },
                { label: 'Trim', value: vehicle.trim || 'N/A', icon: <Tag size={18} /> },
                { label: 'Year', value: vehicle.year.toString(), icon: <Calendar size={18} /> },
                { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} miles`, icon: <Gauge size={18} /> },
                { label: 'VIN', value: vehicle.vin || 'N/A', icon: <Hash size={18} /> },
                { label: 'Stock #', value: vehicle.stockNumber || 'N/A', icon: <Tag size={18} /> },
                { label: 'Condition', value: vehicle.condition, icon: <CheckCircle size={18} /> },
              ]}
            />
            <VehicleSpecs
              specs={[
                { label: 'Body Type', value: vehicle.bodyType, icon: <Car size={18} /> },
                { label: 'Exterior Color', value: vehicle.exteriorColor, icon: <Palette size={18} /> },
                { label: 'Interior Color', value: vehicle.interiorColor || 'N/A', icon: <Palette size={18} /> },
                { label: 'Transmission', value: vehicle.transmission, icon: <Cog size={18} /> },
                { label: 'Fuel Type', value: vehicle.fuelType, icon: <Fuel size={18} /> },
                { label: 'Engine', value: vehicle.engine || 'N/A', icon: <Cog size={18} /> },
                { label: 'Drivetrain', value: vehicle.drivetrain || 'N/A', icon: <Cog size={18} /> },
                { label: 'MPG', value: vehicle.fuelEconomy ? 
                  `${vehicle.fuelEconomy.city} City / ${vehicle.fuelEconomy.highway} Hwy` : 
                  'N/A', 
                  icon: <Gauge size={18} /> 
                },
              ]}
            />
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="space-y-8">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <VehicleContact vehicle={vehicle} />
        </div>
        
        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Vehicles</h2>
            <div className="space-y-4">
              {similarVehicles.map((similar: any) => (
                <div key={similar.id} className="flex border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="w-24 h-16 bg-gray-200 rounded relative overflow-hidden flex-shrink-0">
                    <img
                      src={similar.image || '/images/cars/car-placeholder.jpg'}
                      alt={similar.title || 'Vehicle Image'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/cars/car-placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      <Link href={`/inventory/${similar.id}`} className="hover:text-primary">
                        {similar.title}
                      </Link>
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">{similar.mileage.toLocaleString()} miles</p>
                      <p className="text-sm font-bold text-primary">${similar.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientVehicleComponents;