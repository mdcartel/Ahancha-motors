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

// This would typically come from an API call
async function getVehicle(id: string) {
  // Here you would fetch the vehicle data from your API
  // For demo purposes, we'll use a mock data response
  
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
      description: 'This 2023 Toyota Camry XSE offers a perfect blend of style, comfort, and performance. Featuring a sleek Pearl White exterior and premium Black interior, this sedan stands out with its sporty appearance and refined details. The powerful yet efficient 2.5L 4-Cylinder engine delivers excellent fuel economy while providing responsive acceleration.',
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
      images: [
        '/images/cars/toyota-camry.jpg',
        '/images/cars/toyota-camry-interior.jpg',
        '/images/cars/toyota-camry-rear.jpg',
        '/images/cars/toyota-camry-side.jpg',
        '/images/cars/toyota-camry-dashboard.jpg',
      ],
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
      description: 'This 2022 Honda Accord Sport combines sporty styling with practical features. The Modern Steel exterior gives it a sophisticated look, while the Black interior provides a comfortable driving environment. The turbocharged engine delivers excellent performance and fuel efficiency.',
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
      images: [
        '/images/cars/honda-accord.jpg',
        '/images/cars/honda-accord-interior.jpg',
        '/images/cars/honda-accord-rear.jpg',
        '/images/cars/honda-accord-side.jpg',
        '/images/cars/honda-accord-dashboard.jpg',
      ],
      condition: 'Used',
      bodyType: 'Sedan',
    },
    // Add more vehicles as needed
  ];
  
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return null;
  }
  
  return vehicle;
}

// Similar vehicles would typically be fetched from your API based on the current vehicle
async function getSimilarVehicles(vehicle: any) {
  // For demo purposes, we'll return some mock data
  return [
    {
      id: '5',
      title: '2021 Toyota Camry LE',
      make: 'Toyota',
      model: 'Camry',
      year: 2021,
      price: 24995,
      mileage: 32560,
      image: '/images/cars/toyota-camry-alt.jpg',
    },
    {
      id: '6',
      title: '2022 Nissan Altima SV',
      make: 'Nissan',
      model: 'Altima',
      year: 2022,
      price: 26495,
      mileage: 18750,
      image: '/images/cars/nissan-altima.jpg',
    },
    {
      id: '7',
      title: '2023 Honda Accord EX',
      make: 'Honda',
      model: 'Accord',
      year: 2023,
      price: 29995,
      mileage: 5230,
      image: '/images/cars/honda-accord-alt.jpg',
    },
  ];
}

type GenerateMetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params, searchParams }: GenerateMetadataProps): Promise<Metadata> {
  const vehicle = await getVehicle(params.id);
  
  if (!vehicle) {
    return {
      title: 'Vehicle Not Found',
    };
  }
  
  return {
    title: `${vehicle.title} | Premium Auto Dealership`,
    description: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim} with ${vehicle.mileage.toLocaleString()} miles. ${vehicle.description.substring(0, 120)}...`,
    openGraph: {
      images: [vehicle.images[0]],
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
              <VehicleGallery images={vehicle.images} title={vehicle.title} />
            </div>
            
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vehicle</h2>
              <p className="text-gray-700 whitespace-pre-line">{vehicle.description}</p>
            </div>
            
            {/* Vehicle Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Options</h2>
              <VehicleFeatures features={vehicle.features} />
            </div>
            
            {/* Vehicle Specifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VehicleSpecs
                  specs={[
                    { label: 'Make', value: vehicle.make, icon: <Car size={18} /> },
                    { label: 'Model', value: vehicle.model, icon: <Car size={18} /> },
                    { label: 'Trim', value: vehicle.trim, icon: <Tag size={18} /> },
                    { label: 'Year', value: vehicle.year.toString(), icon: <Calendar size={18} /> },
                    { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} miles`, icon: <Gauge size={18} /> },
                    { label: 'VIN', value: vehicle.vin, icon: <Hash size={18} /> },
                    { label: 'Stock #', value: vehicle.stockNumber, icon: <Tag size={18} /> },
                    { label: 'Condition', value: vehicle.condition, icon: <CheckCircle size={18} /> },
                  ]}
                />
                <VehicleSpecs
                  specs={[
                    { label: 'Body Type', value: vehicle.bodyType, icon: <Car size={18} /> },
                    { label: 'Exterior Color', value: vehicle.exteriorColor, icon: <Palette size={18} /> },
                    { label: 'Interior Color', value: vehicle.interiorColor, icon: <Palette size={18} /> },
                    { label: 'Transmission', value: vehicle.transmission, icon: <Cog size={18} /> },
                    { label: 'Fuel Type', value: vehicle.fuelType, icon: <Fuel size={18} /> },
                    { label: 'Engine', value: vehicle.engine, icon: <Cog size={18} /> },
                    { label: 'Drivetrain', value: vehicle.drivetrain, icon: <Cog size={18} /> },
                    { label: 'MPG', value: `${vehicle.fuelEconomy.city} City / ${vehicle.fuelEconomy.highway} Hwy`, icon: <Gauge size={18} /> },
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Vehicles</h2>
              <div className="space-y-4">
                {similarVehicles.map((similar) => (
                  <div key={similar.id} className="flex border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="w-24 h-16 bg-gray-200 rounded relative overflow-hidden flex-shrink-0">
                      <Image
                        src={similar.image}
                        alt={similar.title}
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
          </div>
        </div>
      </div>
    </div>
  );
}