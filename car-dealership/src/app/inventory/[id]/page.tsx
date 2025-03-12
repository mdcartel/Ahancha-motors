import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
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

import ClientVehicleComponents from './ClientVehicleComponents';

// Fetch a specific vehicle from the API
async function getVehicle(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/vehicles/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
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
    const queryParams = new URLSearchParams({
      make: vehicle.make,
      exclude: vehicle.id,
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
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const vehicle = await getVehicle(params.id);
  
  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | Premium Auto Dealership',
      description: 'The requested vehicle could not be found in our inventory.',
    };
  }
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'),
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
        <ClientVehicleComponents 
          vehicle={vehicle} 
          similarVehicles={similarVehicles} 
        />
      </div>
    </div>
  );
}