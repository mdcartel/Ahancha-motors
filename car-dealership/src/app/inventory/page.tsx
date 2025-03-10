import React from 'react';
import { Metadata } from 'next';
import VehicleList from '@/components/vehicles/VehicleList';

export const metadata: Metadata = {
  title: 'Vehicle Inventory | Browse Our Selection',
  description: 'Browse our extensive inventory of new, used, and certified pre-owned vehicles. Find your perfect car, truck, or SUV today.',
  keywords: 'car inventory, new cars, used cars, certified pre-owned, car dealership',
};

// This would typically fetch data from an API
async function getVehicles() {
  // Simulate API call with mock data
  return [
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
      image: '/images/cars/honda-accord.jpg',
      featured: true,
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
      image: '/images/cars/ford-f150.jpg',
      featured: true,
      condition: 'New',
      bodyType: 'Truck',
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
      condition: 'Used',
      bodyType: 'SUV',
    },
    {
      id: '5',
      title: '2021 Mercedes-Benz E-Class',
      make: 'Mercedes-Benz',
      model: 'E-Class',
      trim: 'E 350',
      year: 2021,
      price: 48995,
      mileage: 22450,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      exteriorColor: 'Obsidian Black',
      image: '/images/cars/mercedes-e-class.jpg',
      featured: false,
      condition: 'Used',
      bodyType: 'Sedan',
    },
    {
      id: '6',
      title: '2023 Audi Q7 Premium Plus',
      make: 'Audi',
      model: 'Q7',
      trim: 'Premium Plus',
      year: 2023,
      price: 62995,
      mileage: 8760,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      exteriorColor: 'Glacier White',
      image: '/images/cars/audi-q7.jpg',
      featured: false,
      condition: 'New',
      bodyType: 'SUV',
    },
    {
      id: '7',
      title: '2022 Lexus RX 350',
      make: 'Lexus',
      model: 'RX',
      trim: '350',
      year: 2022,
      price: 47995,
      mileage: 16280,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      exteriorColor: 'Matador Red',
      image: '/images/cars/lexus-rx.jpg',
      featured: false,
      condition: 'Used',
      bodyType: 'SUV',
    },
    {
      id: '8',
      title: '2023 Chevrolet Silverado 1500',
      make: 'Chevrolet',
      model: 'Silverado 1500',
      trim: 'LT',
      year: 2023,
      price: 42995,
      mileage: 7850,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      exteriorColor: 'Silver Ice',
      image: '/images/cars/chevrolet-silverado.jpg',
      featured: false,
      condition: 'New',
      bodyType: 'Truck',
    },
  ];
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams?: { 
    [key: string]: string | string[] | undefined 
  };
}) {
  const vehicles = await getVehicles();
  
  // Filter vehicles based on search parameters
  // This would typically be handled by the API, but we're doing it client-side for this example
  const filteredVehicles = vehicles.filter(vehicle => {
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
    // You would add more filter conditions here based on your search parameters
    
    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Vehicle Inventory</h1>
          <p className="mt-2 text-blue-200">Find your perfect vehicle from our extensive selection</p>
        </div>
      </div>

      {/* Inventory Content */}
      <div className="container mx-auto px-4 py-8">
        <VehicleList vehicles={filteredVehicles} />
      </div>
    </div>
  );
}