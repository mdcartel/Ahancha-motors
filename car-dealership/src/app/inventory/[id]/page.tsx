import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
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
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import VehicleFeatures from '@/components/vehicles/VehicleFeatures';
import VehicleSpecs from '@/components/vehicles/VehicleSpecs';
import VehicleContact from '@/components/vehicles/VehicleContact';

// Fetch a specific vehicle from the API
async function getVehicle(id: string) {
  try {
    // Use relative URL for API routes in Next.js
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/vehicles/${id}`, {
      // Add cache options as needed
      cache: 'no-store', // Don't cache for dynamic vehicle details
      // Or use revalidation for better performance with fresh data
      // next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Vehicle not found
      }
      throw new Error(`Failed to fetch vehicle: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching vehicle ${id}:`, error);
    return null;
  }
}

// Fetch similar vehicles from the API
async function getSimilarVehicles(vehicle: any) {
  try {
    // Build query params to find similar vehicles
    const queryParams = new URLSearchParams({
      make: vehicle.make,
      // Exclude the current vehicle
      exclude: vehicle.id,
      // Limit the results
      limit: '3'
    }).toString();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/vehicles/similar?${queryParams}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch similar vehicles: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching similar vehicles:', error);
    return [];
  }
}

type GenerateMetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params, searchParams }: GenerateMetadataProps): Promise<Metadata> {
  const vehicle = await getVehicle(params.id);
  
  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | Premium Auto Dealership',
      description: 'The requested vehicle could not be found in our inventory.',
    };
  }
  
  return {
    title: `${vehicle.title} | Premium Auto Dealership`,
    description: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ''} with ${vehicle.mileage.toLocaleString()} miles. ${vehicle.description ? vehicle.description.substring(0, 150) + '...' : ''}`,
    openGraph: {
      title: `${vehicle.title} | Premium Auto Dealership`,
      description: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ''} with ${vehicle.mileage.toLocaleString()} miles.`,
      images: vehicle.images && vehicle.images.length > 0 ? [vehicle.images[0]] : [],
      type: 'website',
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const vehicle = await getVehicle(params.id);
  
  if (!vehicle) {
    notFound();
  }
  
  const similarVehicles = await getSimilarVehicles(vehicle);
  
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Vehicle Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/inventory" 
            className="flex items-center text-primary hover:text-primary-dark mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inventory
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{vehicle.title}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <Gauge className="mr-1 h-4 w-4" />
                  {vehicle.mileage.toLocaleString()} miles
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {vehicle.year}
                </span>
                <span className="flex items-center">
                  <Fuel className="mr-1 h-4 w-4" />
                  {vehicle.fuelType}
                </span>
                <span className="flex items-center">
                  <Cog className="mr-1 h-4 w-4" />
                  {vehicle.transmission}
                </span>
                <span className="flex items-center">
                  <Car className="mr-1 h-4 w-4" />
                  {vehicle.bodyType}
                </span>
                <span className="flex items-center">
                  <Award className="mr-1 h-4 w-4" />
                  {vehicle.condition}
                </span>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-primary self-start md:self-center">
              ${vehicle.price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
                  {similarVehicles.map((similar: { id: React.Key | null | undefined; image: any; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; mileage: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; price: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; }) => (
                    <div key={similar.id} className="flex border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="w-24 h-16 bg-gray-200 rounded relative overflow-hidden flex-shrink-0">
                        <Image
                          src={similar.image || '/images/cars/car-placeholder.jpg'}
                          alt={String(similar.title || 'Vehicle Image')}
                          fill
                          sizes="96px"
                          className="object-cover"
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
      </div>
    </div>
  );
}