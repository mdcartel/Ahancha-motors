'use client';

import React, { useState } from 'react';
import VehicleCard from './VehicleCard';
import VehicleFilters from './VehicleFilters';
import { Grid, List, ChevronDown, Sliders, Search, X } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);

  // Apply search filter
  const searchFilteredVehicles = searchTerm 
    ? filteredVehicles.filter(vehicle => 
        vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vehicle.trim && vehicle.trim.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredVehicles;

  // Applied client-side sorting
  const sortedVehicles = [...searchFilteredVehicles].sort((a, b) => {
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
        {/* Search input */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest</option>
              <option value="year-asc">Year: Oldest</option>
              <option value="mileage-asc">Mileage: Lowest</option>
              <option value="mileage-desc">Mileage: Highest</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          
          <button 
            onClick={() => setFiltersVisible(!filtersVisible)}
            className={`flex items-center gap-2 border rounded-lg py-2 px-4 transition-colors ${
              filtersVisible 
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Sliders className="h-5 w-5" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${filtersVisible ? 'transform rotate-180' : ''}`} />
          </button>
          
          <div className="bg-white border border-gray-300 rounded-lg flex">
            <button 
              onClick={() => setViewMode('grid')}
              className={`py-2 px-3 rounded-l-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`py-2 px-3 rounded-r-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
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
          <div className="w-full md:w-64 bg-white border border-gray-200 rounded-lg p-4 mb-6 md:mb-0">
            <VehicleFilters allVehicles={vehicles} onFilterChange={handleFilterChange} />
          </div>
        )}
        
        {/* Vehicle Listings */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">Showing <span className="font-medium">{sortedVehicles.length}</span> of <span className="font-medium">{vehicles.length}</span> vehicles</p>
            {filteredVehicles.length !== vehicles.length && (
              <button 
                onClick={() => setFilteredVehicles(vehicles)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
          
          {sortedVehicles.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src={vehicle.image}
                          alt={vehicle.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/cars/car-placeholder.jpg';
                          }}
                        />
                        {vehicle.featured && (
                          <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold py-1 px-3">
                            Featured
                          </div>
                        )}
                        {vehicle.condition && (
                          <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-semibold py-1 px-3">
                            {vehicle.condition}
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{vehicle.title}</h3>
                          <span className="text-xl font-bold text-red-600 mt-1 md:mt-0">${vehicle.price.toLocaleString()}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{vehicle.mileage.toLocaleString()} miles</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <span className="text-gray-500">Transmission:</span>
                            <span className="font-medium">{vehicle.transmission}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span className="text-gray-500">Fuel:</span>
                            <span className="font-medium">{vehicle.fuelType}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span className="text-gray-500">Color:</span>
                            <span className="font-medium">{vehicle.exteriorColor}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span className="text-gray-500">Condition:</span>
                            <span className="font-medium">{vehicle.condition}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span className="text-gray-500">Body:</span>
                            <span className="font-medium">{vehicle.bodyType}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <a
                            href={`/inventory/${vehicle.id}`}
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
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
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
              <button
                onClick={() => {
                  setFilteredVehicles(vehicles);
                  setSearchTerm('');
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
          
          {/* Pagination - would be implemented for real data */}
          {sortedVehicles.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 hover:bg-gray-50">
                  Previous
                </a>
                <a href="#" className="py-2 px-4 bg-red-600 border border-red-600 text-sm font-medium text-white">
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