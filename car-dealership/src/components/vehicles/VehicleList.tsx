'use client';

import React, { useState } from 'react';
import VehicleCard from './VehicleCard';
import VehicleFilters from './VehicleFilters';
import VehicleSearch from './VehicleSearch';
import { Grid, List, ChevronDown, Sliders } from 'lucide-react';

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
  condition: string;
  bodyType: string;
}

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [sortOption, setSortOption] = useState('featured');
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);

  // Applied client-side sorting
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'year-desc':
        return b.year - a.year;
      case 'year-asc':
        return a.year - b.year;
      case 'mileage-asc':
        return a.mileage - b.mileage;
      case 'mileage-desc':
        return b.mileage - a.mileage;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  // Function to handle filtering
  const handleFilterChange = (filteredVehicles: Vehicle[]) => {
    setFilteredVehicles(filteredVehicles);
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <VehicleSearch />
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest</option>
              <option value="year-asc">Year: Oldest</option>
              <option value="mileage-asc">Mileage: Lowest</option>
              <option value="mileage-desc">Mileage: Highest</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4"
          >
            <Sliders className="h-5 w-5" />
            <span>Filters</span>
            {filtersVisible ? 
              <ChevronDown className="h-4 w-4 transform rotate-180" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </button>
          
          <div className="bg-white border border-gray-300 rounded-md flex">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-500'}`}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'text-primary' : 'text-gray-500'}`}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        {filtersVisible && (
          <div className="w-full md:w-64 bg-white border border-gray-200 rounded-lg p-4">
            <VehicleFilters allVehicles={vehicles} onFilterChange={handleFilterChange} />
          </div>
        )}
        
        {/* Vehicle Listings */}
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-gray-600">Showing {sortedVehicles.length} of {vehicles.length} vehicles</p>
          </div>
          
          {sortedVehicles.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 bg-gray-200 relative">
                        {/* We'll use an img tag for simplicity in this example */}
                        <img
                          src={vehicle.image}
                          alt={vehicle.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/cars/car-placeholder.jpg';
                          }}
                        />
                        {vehicle.featured && (
                          <div className="absolute top-2 right-2 bg-accent text-white text-sm font-semibold py-1 px-2 rounded">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{vehicle.title}</h3>
                          <span className="text-xl font-bold text-primary">${vehicle.price.toLocaleString()}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{vehicle.mileage.toLocaleString()} miles</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <span>Transmission:</span>
                            <span className="font-medium">{vehicle.transmission}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span>Fuel:</span>
                            <span className="font-medium">{vehicle.fuelType}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span>Color:</span>
                            <span className="font-medium">{vehicle.exteriorColor}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span>Condition:</span>
                            <span className="font-medium">{vehicle.condition}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span>Body:</span>
                            <span className="font-medium">{vehicle.bodyType}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <a
                            href={`/inventory/${vehicle.id}`}
                            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
            </div>
          )}
          
          {/* Pagination - would be implemented for real data */}
          {sortedVehicles.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 hover:bg-gray-50">
                  Previous
                </a>
                <a href="#" className="py-2 px-4 bg-primary border border-primary text-sm font-medium text-white">
                  1
                </a>
                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 hover:bg-gray-50">
                  Next
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleList;