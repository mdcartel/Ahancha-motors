'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, X, ArrowLeft, Check, Minus } from 'lucide-react';

// This would typically come from an API call
async function getVehicleById(id: string) {
  // Sample vehicle data for demonstration
  const vehicles = [
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
      interiorColor: 'Black',
      vin: '4T1BZ1HK5LU123456',
      stockNumber: 'TC12345',
      engine: '2.5L 4-Cylinder',
      drivetrain: 'Front-Wheel Drive',
      fuelEconomy: {
        city: 28,
        highway: 39,
        combined: 32,
      },
      features: [
        {
          category: 'Comfort & Convenience',
          items: [
            'Leather Seats',
            'Heated Front Seats',
            'Dual-Zone Climate Control',
            'Power Moonroof',
            'Power Driver Seat with Memory',
            'Push Button Start',
            'Smart Key System',
          ],
        },
        {
          category: 'Technology',
          items: [
            '9" Touchscreen Infotainment Display',
            'Apple CarPlay & Android Auto',
            'JBL Premium Audio System',
            'Wireless Charging Pad',
            'Bluetooth Connectivity',
            'USB Ports',
            'SiriusXM Satellite Radio',
          ],
        },
        {
          category: 'Safety',
          items: [
            'Toyota Safety Sense 2.5+',
            'Pre-Collision System',
            'Lane Departure Alert',
            'Adaptive Cruise Control',
            'Blind Spot Monitor',
            'Rear Cross Traffic Alert',
            'Backup Camera',
          ],
        },
      ],
      image: '/images/cars/toyota-camry.jpg',
      condition: 'New',
      bodyType: 'Sedan',
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
      interiorColor: 'Black',
      vin: '1HGCV2F34NA123456',
      stockNumber: 'HA12345',
      engine: '1.5L Turbocharged 4-Cylinder',
      drivetrain: 'Front-Wheel Drive',
      fuelEconomy: {
        city: 29,
        highway: 35,
        combined: 31,
      },
      features: [
        {
          category: 'Comfort & Convenience',
          items: [
            'Sport Seats with Cloth/Leatherette Trim',
            'Heated Front Seats',
            'Dual-Zone Climate Control',
            'Power Driver Seat',
            'Push Button Start',
            'Remote Start',
          ],
        },
        {
          category: 'Technology',
          items: [
            '8" Touchscreen Display',
            'Apple CarPlay & Android Auto',
            'Bluetooth Connectivity',
            'USB Ports',
            'SiriusXM Satellite Radio',
          ],
        },
        {
          category: 'Safety',
          items: [
            'Honda Sensing Suite',
            'Collision Mitigation Braking System',
            'Road Departure Mitigation',
            'Adaptive Cruise Control',
            'Lane Keeping Assist System',
            'Multi-Angle Rearview Camera',
          ],
        },
      ],
      image: '/images/cars/honda-accord.jpg',
      condition: 'Used',
      bodyType: 'Sedan',
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
      interiorColor: 'Black/Brown',
      vin: '1FTFW1E82NFA12345',
      stockNumber: 'FF12345',
      engine: '3.5L EcoBoost V6',
      drivetrain: '4x4',
      fuelEconomy: {
        city: 18,
        highway: 24,
        combined: 20,
      },
      features: [
        {
          category: 'Comfort & Convenience',
          items: [
            'Leather Seats',
            'Heated & Ventilated Front Seats',
            'Dual-Zone Climate Control',
            'Power Adjustable Pedals',
            'Power Tailgate',
            'Remote Start',
          ],
        },
        {
          category: 'Technology',
          items: [
            '12" Touchscreen with SYNC 4',
            'Apple CarPlay & Android Auto',
            'B&O Sound System',
            'Wireless Charging Pad',
            '360-Degree Camera',
            'Pro Trailer Backup Assist',
          ],
        },
        {
          category: 'Safety',
          items: [
            'Ford Co-Pilot360',
            'Pre-Collision Assist',
            'Lane-Keeping System',
            'Adaptive Cruise Control',
            'Blind Spot Information System',
            'Rear Cross Traffic Alert',
          ],
        },
      ],
      image: '/images/cars/ford-f150.jpg',
      condition: 'New',
      bodyType: 'Truck',
    },
  ];
  
  return vehicles.find(v => v.id === id) || null;
}

export default function VehicleComparePage() {
  const searchParams = useSearchParams();
  const vehicleIds = searchParams.getAll('ids');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [comparisonFeatures, setComparisonFeatures] = useState<{[key: string]: string[]}>({});
  
  // Maximum number of vehicles that can be compared at once
  const MAX_COMPARISON_VEHICLES = 3;
  
  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      
      try {
        const promises = vehicleIds.map(id => getVehicleById(id));
        const results = await Promise.all(promises);
        
        // Filter out null results
        const validVehicles = results.filter(Boolean);
        setVehicles(validVehicles);
        
        // Generate comparison features
        if (validVehicles.length > 0) {
          const featureCategories: {[key: string]: string[]} = {};
          
          validVehicles.forEach(vehicle => {
            if (vehicle && vehicle.features) {
              vehicle.features.forEach((featureGroup: any) => {
                if (!featureCategories[featureGroup.category]) {
                  featureCategories[featureGroup.category] = [];
                }
                
                featureGroup.items.forEach((item: string) => {
                  if (!featureCategories[featureGroup.category].includes(item)) {
                    featureCategories[featureGroup.category].push(item);
                  }
                });
              });
            }
          });
          
          setComparisonFeatures(featureCategories);
        }
      } catch (error) {
        console.error('Error fetching vehicles for comparison:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchVehicles();
  }, [vehicleIds]);
  
  // Check if a vehicle has a specific feature
  const hasFeature = (vehicle: any, feature: string) => {
    if (!vehicle.features) return false;
    
    return vehicle.features.some((featureGroup: any) => 
      featureGroup.items.includes(feature)
    );
  };
  
  // Remove a vehicle from comparison
  const removeVehicle = (id: string) => {
    const newIds = vehicleIds.filter(vehicleId => vehicleId !== id);
    const queryString = newIds.map(id => `ids=${id}`).join('&');
    
    if (newIds.length > 0) {
      window.location.href = `/vehicles/compare?${queryString}`;
    } else {
      window.location.href = '/inventory';
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/inventory" 
            className="flex items-center text-primary hover:text-primary-dark mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inventory
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Compare Vehicles</h1>
          <p className="text-gray-600 mt-2">
            Compare features, specifications, and pricing to make an informed decision.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading vehicles for comparison...</p>
            </div>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Vehicles Selected</h2>
            <p className="text-gray-600 mb-6">
              Please select vehicles from our inventory to compare them side by side.
            </p>
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
            >
              Browse Inventory
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Vehicle Headers */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {vehicles.length === 1 ? '1 Vehicle Selected' : `${vehicles.length} Vehicles Selected`}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {vehicles.length < MAX_COMPARISON_VEHICLES ? (
                    `You can add up to ${MAX_COMPARISON_VEHICLES - vehicles.length} more vehicle${MAX_COMPARISON_VEHICLES - vehicles.length === 1 ? '' : 's'}.`
                  ) : (
                    'Maximum number of vehicles selected for comparison.'
                  )}
                </p>
                
                {vehicles.length < MAX_COMPARISON_VEHICLES && (
                  <Link 
                    href="/inventory"
                    className="inline-flex items-center text-primary hover:text-primary-dark font-medium mt-2 text-sm"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Another Vehicle
                  </Link>
                )}
              </div>
              
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{vehicle.title}</h3>
                    <button
                      onClick={() => removeVehicle(vehicle.id)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Remove ${vehicle.title} from comparison`}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-2 text-xl font-bold text-primary">${vehicle.price.toLocaleString()}</div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    {vehicle.mileage.toLocaleString()} miles
                  </div>
                  
                  <Link
                    href={`/inventory/${vehicle.id}`}
                    className="inline-block mt-3 text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    View Details
                  </Link>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                <div key={`empty-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                  <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                    <Link
                      href="/inventory"
                      className="text-gray-500 hover:text-primary flex flex-col items-center p-4"
                    >
                      <Plus size={24} className="mb-2" />
                      <span className="text-center text-sm">Add Vehicle</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-t border-gray-200">
              <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                Vehicle Image
              </div>
              
              {vehicles.map((vehicle) => (
                <div key={`img-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                  <div className="relative h-48 bg-gray-200 rounded overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/cars/car-placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
              ))}
              
              {/* Empty image slots */}
              {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                <div key={`empty-img-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                  <div className="h-48 bg-gray-200 rounded-md"></div>
                </div>
              ))}
            </div>
            
            {/* Basic Specs */}
            <div className="border-t border-gray-200">
              <div className="p-4 bg-gray-100 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Basic Specifications</h3>
              </div>
              
              {/* Year */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Year
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`year-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.year}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-year-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* Make */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Make
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`make-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.make}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-make-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* Model */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Model
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`model-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.model}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-model-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* Trim */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Trim
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`trim-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.trim}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-trim-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* Engine */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Engine
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`engine-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.engine}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-engine-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* Transmission */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Transmission
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`transmission-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.transmission}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-transmission-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* Drivetrain */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Drivetrain
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`drivetrain-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.drivetrain}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-drivetrain-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* MPG */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Fuel Economy (City/Hwy/Combined)
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`mpg-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.fuelEconomy ? (
                      `${vehicle.fuelEconomy.city} / ${vehicle.fuelEconomy.highway} / ${vehicle.fuelEconomy.combined} MPG`
                    ) : (
                      'N/A'
                    )}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-mpg-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* Exterior Color */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Exterior Color
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`ext-color-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.exteriorColor}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-ext-color-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
              
              {/* Interior Color */}
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-900 border-b md:border-b-0 md:border-r border-gray-200">
                  Interior Color
                </div>
                
                {vehicles.map((vehicle) => (
                  <div key={`int-color-${vehicle.id}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                    {vehicle.interiorColor}
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                  <div key={`empty-int-color-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                    -
                  </div>
                ))}
              </div>
            </div>
            
            {/* Features Comparison */}
            {Object.keys(comparisonFeatures).length > 0 && (
              <div className="border-t border-gray-200">
                <div className="p-4 bg-gray-100 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Features Comparison</h3>
                </div>
                
                {Object.entries(comparisonFeatures).map(([category, features]) => (
                  <div key={category}>
                    <div className="p-4 bg-gray-50 font-semibold text-gray-900 border-b border-gray-200">
                      {category}
                    </div>
                    
                    {features.map((feature) => (
                      <div key={feature} className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                        <div className="p-4 bg-gray-50 text-gray-700 border-b md:border-b-0 md:border-r border-gray-200">
                          {feature}
                        </div>
                        
                        {vehicles.map((vehicle) => (
                          <div key={`${vehicle.id}-${feature}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0">
                            {hasFeature(vehicle, feature) ? (
                              <Check size={20} className="text-green-500" />
                            ) : (
                              <Minus size={20} className="text-gray-300" />
                            )}
                          </div>
                        ))}
                        
                        {/* Empty slots */}
                        {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.
                        length) }).map((_, index) => (
                            <div key={`empty-feature-${feature}-${index}`} className="p-4 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 bg-gray-50">
                              -
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              
              {/* CTA Buttons */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Ready to decide?</h3>
                  </div>
                  
                  {vehicles.map((vehicle) => (
                    <div key={`cta-${vehicle.id}`} className="flex flex-col space-y-2">
                      <Link
                        href={`/inventory/${vehicle.id}`}
                        className="inline-flex justify-center items-center px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
                      >
                        View {vehicle.make} {vehicle.model} Details
                      </Link>
                      <button
                        onClick={() => {
                          alert(`Scheduling a test drive for ${vehicle.title}`);
                        }}
                        className="inline-flex justify-center items-center px-4 py-2 bg-white text-primary font-medium rounded-md border border-primary hover:bg-gray-50 transition-colors"
                      >
                        Schedule Test Drive
                      </button>
                    </div>
                  ))}
                  
                  {/* Empty slots */}
                  {Array.from({ length: Math.max(0, MAX_COMPARISON_VEHICLES - vehicles.length) }).map((_, index) => (
                    <div key={`empty-cta-${index}`} className="hidden md:block"></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }