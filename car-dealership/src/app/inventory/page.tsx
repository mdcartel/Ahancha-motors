import React from 'react';
import { Metadata } from 'next';
import VehicleList from '@/components/vehicles/VehicleList';
import Image from 'next/image';
import Newsletter from '@/components/home/Newsletter';

export const metadata: Metadata = {
  title: 'Vehicle Inventory | Browse Our Selection',
  description: 'Browse our extensive inventory of new, used, and certified pre-owned vehicles. Find your perfect car, truck, or SUV today.',
  keywords: 'car inventory, new cars, used cars, certified pre-owned, car dealership',
};

// Fetch vehicles from the API
async function getVehicles() {
  try {
    // Use relative URL for API routes in Next.js
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/vehicles`, {
      // Add cache options as needed
      cache: 'no-store', // Don't cache for dynamic inventory pages
      // Or use revalidation for better performance with fresh data
      // next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    // Return empty array on error to avoid breaking the page
    return [];
  }
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const vehicles = await getVehicles();
  
  // Filter vehicles based on search parameters
  interface Vehicle {
    make: string;
    model: string;
    condition: string;
    bodyType: string;
  }

  interface SearchParams {
    make?: string;
    model?: string;
    condition?: string;
    bodyType?: string;
  }

  const filteredVehicles = vehicles.filter((vehicle: Vehicle) => {
    if (searchParams?.make && vehicle.make.toLowerCase() !== (searchParams.make as string).toLowerCase()) {
      return false;
    }
    if (searchParams?.model && vehicle.model.toLowerCase() !== (searchParams.model as string).toLowerCase()) {
      return false;
    }
    if (searchParams?.condition && vehicle.condition.toLowerCase() !== (searchParams.condition as string).toLowerCase()) {
      return false;
    }
    if (searchParams?.bodyType && vehicle.bodyType.toLowerCase() !== (searchParams.bodyType as string).toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image 
            src="/images/backgrounds/bmw.png" 
            alt="Premium Auto Dealership" 
            fill 
            className="object-cover xl:object-left"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
              Inventory
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Vehicle Inventory</h1>
            <p className="text-lg text-gray-300">
              Find your perfect vehicle from our extensive selection
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {vehicles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Vehicles Found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any vehicles in our inventory right now.
              Please check back soon as we're constantly updating our selection.
            </p>
          </div>
        ) : (
          <VehicleList vehicles={filteredVehicles} />
        )}
      </div>
      <Newsletter />
    </div>
  );
}