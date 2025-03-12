'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, ChevronDown, X, Car } from 'lucide-react';

// Define vehicle interface
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
  bodyType?: string;
  condition?: string;
  image?: string;
}

const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    model: searchParams.get('model') || '',
    bodyType: searchParams.get('bodyType') || '',
    priceRange: searchParams.get('priceRange') || '',
    condition: searchParams.get('condition') || '',
    minYear: searchParams.get('minYear') || '',
    maxYear: searchParams.get('maxYear') || '',
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [bodyTypes, setBodyTypes] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available makes, models, and body types from API on component mount
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        
        const vehicles: Vehicle[] = await response.json();
        
        // Extract unique values
        const uniqueMakes = [...new Set(vehicles.map(vehicle => vehicle.make))].sort();
        const uniqueBodyTypes = [...new Set(vehicles.filter(v => v.bodyType).map(v => v.bodyType as string))].sort();
        const uniqueYears = [...new Set(vehicles.map(v => v.year))].sort((a, b) => b - a);
        
        setMakes(uniqueMakes);
        setBodyTypes(uniqueBodyTypes);
        setYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVehicleData();
  }, []);

  // Update available models when make changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!filters.make) {
        setModels([]);
        return;
      }
      
      try {
        const response = await fetch('/api/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        
        const vehicles: Vehicle[] = await response.json();
        const filteredVehicles = vehicles.filter(v => 
          v.make.toLowerCase() === filters.make.toLowerCase()
        );
        const uniqueModels = [...new Set(filteredVehicles.map(v => v.model))].sort();
        
        setModels(uniqueModels);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
    
    fetchModels();
  }, [filters.make]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => {
      // If changing make, reset model
      if (name === 'make' && prev.model && value !== prev.make) {
        return { ...prev, [name]: value, model: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string from filters and search term
    const queryParams = new URLSearchParams();
    
    if (searchTerm) {
      queryParams.append('search', searchTerm);
    }
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    
    // Navigate to inventory page with filters
    router.push(`/inventory?${queryParams.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      make: '',
      model: '',
      bodyType: '',
      priceRange: '',
      condition: '',
      minYear: '',
      maxYear: '',
    });
    setSearchTerm('');
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  return (
    <section className="relative z-30 -mt-12 px-4 mb-16">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Simplified search header */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Find Your Perfect Vehicle</h2>

              <div className="flex flex-col md:flex-row gap-3 items-end">
                {/* Search input */}
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by make, model, or keyword..."
                    className="w-full h-10 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
                  />
                </div>
                
                {/* Quick filter for condition */}
                <div className="md:w-48">
                  <select
                    id="condition"
                    name="condition"
                    value={filters.condition}
                    onChange={handleChange}
                    className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
                  >
                    <option value="">Any Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                  </select>
                </div>
                
                {/* Search button */}
                <div>
                  <button
                    type="submit"
                    className="w-full md:w-auto h-10 px-5 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Search size={16} />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter toggle */}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors text-sm"
              >
                <Filter size={16} />
                <span className="font-medium">Advanced Filters</span>
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                />
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-600 text-white text-xs rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <X size={12} />
                  <span>Clear all</span>
                </button>
              )}
            </div>
            
            {/* Advanced filters (expandable) */}
            <div className={`bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-[400px] py-4' : 'max-h-0'
            }`}>
              <div className="px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label htmlFor="make" className="block text-xs font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <select
                      id="make"
                      name="make"
                      value={filters.make}
                      onChange={handleChange}
                      className="w-full p-2 text-sm bg-white border border-gray-300 rounded focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
                      disabled={isLoading}
                    >
                      <option value="">Any Make</option>
                      {makes.map(make => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="model" className="block text-xs font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <select
                      id="model"
                      name="model"
                      value={filters.model}
                      onChange={handleChange}
                      className="w-full p-2 text-sm bg-white border border-gray-300 rounded focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 text-gray-700"
                      disabled={!filters.make || isLoading}
                    >
                      <option value="">Any Model</option>
                      {models.map(model => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="bodyType" className="block text-xs font-medium text-gray-700 mb-1">
                      Body Type
                    </label>
                    <select
                      id="bodyType"
                      name="bodyType"
                      value={filters.bodyType}
                      onChange={handleChange}
                      className="w-full p-2 text-sm bg-white border border-gray-300 rounded focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 text-gray-700"
                      disabled={isLoading}
                    >
                      <option value="">Any Body Type</option>
                      {bodyTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="priceRange" className="block text-xs font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <select
                      id="priceRange"
                      name="priceRange"
                      value={filters.priceRange}
                      onChange={handleChange}
                      className="w-full p-2 text-sm bg-white border border-gray-300 rounded focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 text-gray-700"
                    >
                      <option value="">Any Price</option>
                      <option value="under-20000">Under $20,000</option>
                      <option value="20000-30000">$20,000 - $30,000</option>
                      <option value="30000-40000">$30,000 - $40,000</option>
                      <option value="40000-50000">$40,000 - $50,000</option>
                      <option value="over-50000">Over $50,000</option>
                    </select>
                  </div>
                </div>
                
                {/* Year Range */}
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Year Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      id="minYear"
                      name="minYear"
                      value={filters.minYear}
                      onChange={handleChange}
                      className="w-full p-2 text-sm bg-white border border-gray-300 rounded focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 text-gray-700"
                    >
                      <option value="">Min Year</option>
                      {years.map(year => (
                        <option key={`min-${year}`} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <select
                      id="maxYear"
                      name="maxYear"
                      value={filters.maxYear}
                      onChange={handleChange}
                      className="w-full p-2 text-sm bg-white border border-gray-300 rounded focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 text-gray-700"
                    >
                      <option value="">Max Year</option>
                      {years.map(year => (
                        <option key={`max-${year}`} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Action buttons for advanced filter section */}
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-medium transition-colors shadow-md flex items-center gap-1"
                  >
                    <span>Apply Filters</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Quick filter chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button 
            onClick={() => {
              router.push('/inventory?sort=featured');
            }}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Car size={12} />
            <span>Featured</span>
          </button>
          <button 
            onClick={() => {
              router.push('/inventory?bodyType=SUV');
            }}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-medium transition-colors"
          >
            SUVs
          </button>
          <button 
            onClick={() => {
              // For the luxury filter, we'll navigate to a route that the VehicleList can interpret
              router.push('/inventory?sort=price-desc');
            }}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-medium transition-colors"
          >
            Luxury
          </button>
          <button 
            onClick={() => {
              router.push('/inventory?fuelType=Electric');
            }}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-medium transition-colors"
          >
            Electric
          </button>
          <button 
            onClick={() => {
              router.push('/inventory?priceRange=under-30000');
            }}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-medium transition-colors"
          >
            Under $30k
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;