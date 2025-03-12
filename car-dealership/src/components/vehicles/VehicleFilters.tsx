'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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

interface VehicleFiltersProps {
  allVehicles: Vehicle[];
  onFilterChange: (filteredVehicles: Vehicle[]) => void;
}

interface Filters {
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  bodyType: string[];
  condition: string[];
  transmission: string[];
  fuelType: string[];
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({ allVehicles, onFilterChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize filters from URL params on first render only
  const [filters, setFilters] = useState<Filters>(() => {
    return {
      make: searchParams.get('make') || '',
      model: searchParams.get('model') || '',
      minYear: searchParams.get('minYear') || '',
      maxYear: searchParams.get('maxYear') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      bodyType: searchParams.get('bodyType') ? [searchParams.get('bodyType')!] : [],
      condition: searchParams.get('condition') ? [searchParams.get('condition')!] : [],
      transmission: searchParams.get('transmission') ? [searchParams.get('transmission')!] : [],
      fuelType: searchParams.get('fuelType') ? [searchParams.get('fuelType')!] : [],
    };
  });

  // Memoize unique values to prevent unnecessary recalculations
  const uniqueMakes = useMemo(() => [...new Set(allVehicles.map(v => v.make))].sort(), [allVehicles]);
  const uniqueModels = useMemo(() => 
    [...new Set(allVehicles.filter(v => !filters.make || v.make === filters.make).map(v => v.model))].sort(), 
    [allVehicles, filters.make]);
  const uniqueYears = useMemo(() => 
    [...new Set(allVehicles.map(v => v.year))].sort((a, b) => b - a), 
    [allVehicles]);
  const uniqueBodyTypes = useMemo(() => 
    [...new Set(allVehicles.map(v => v.bodyType))].sort(), 
    [allVehicles]);
  const uniqueConditions = useMemo(() => 
    [...new Set(allVehicles.map(v => v.condition))].sort(), 
    [allVehicles]);
  const uniqueTransmissions = useMemo(() => 
    [...new Set(allVehicles.map(v => v.transmission))].sort(), 
    [allVehicles]);
  const uniqueFuelTypes = useMemo(() => 
    [...new Set(allVehicles.map(v => v.fuelType))].sort(), 
    [allVehicles]);
  
  // Get filtered vehicles based on current filters
  const getFilteredVehicles = useCallback(() => {
    return allVehicles.filter(vehicle => {
      // Make filter
      if (filters.make && vehicle.make !== filters.make) return false;
      
      // Model filter
      if (filters.model && vehicle.model !== filters.model) return false;
      
      // Year range filter
      if (filters.minYear && vehicle.year < parseInt(filters.minYear)) return false;
      if (filters.maxYear && vehicle.year > parseInt(filters.maxYear)) return false;
      
      // Price range filter
      if (filters.minPrice && vehicle.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && vehicle.price > parseInt(filters.maxPrice)) return false;
      
      // Body type filter
      if (filters.bodyType.length > 0 && !filters.bodyType.includes(vehicle.bodyType)) return false;
      
      // Condition filter
      if (filters.condition.length > 0 && !filters.condition.includes(vehicle.condition)) return false;
      
      // Transmission filter
      if (filters.transmission.length > 0 && !filters.transmission.includes(vehicle.transmission)) return false;
      
      // Fuel type filter
      if (filters.fuelType.length > 0 && !filters.fuelType.includes(vehicle.fuelType)) return false;
      
      return true;
    });
  }, [allVehicles, filters]);
  
  // Apply filters effect - key fix is here
  useEffect(() => {
    const filteredVehicles = getFilteredVehicles();
    onFilterChange(filteredVehicles);
  }, [getFilteredVehicles]);
  
  // Handle text/select input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special case: when make changes, reset model
    if (name === 'make') {
      setFilters(prev => ({ ...prev, [name]: value, model: '' }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle checkbox input changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setFilters(prev => {
      if (checked) {
        return { ...prev, [name]: [...prev[name as keyof Filters] as string[], value] };
      } else {
        return { 
          ...prev, 
          [name]: (prev[name as keyof Filters] as string[]).filter(item => item !== value) 
        };
      }
    });
  };
  
  // Apply filters to URL and update browser history
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    
    if (filters.make) params.set('make', filters.make);
    if (filters.model) params.set('model', filters.model);
    if (filters.minYear) params.set('minYear', filters.minYear);
    if (filters.maxYear) params.set('maxYear', filters.maxYear);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    
    if (filters.condition.length === 1) {
      params.set('condition', filters.condition[0]);
    } else if (filters.condition.length > 1) {
      filters.condition.forEach((condition) => {
        params.append('condition', condition);
      });
    }
    
    if (filters.bodyType.length === 1) {
      params.set('bodyType', filters.bodyType[0]);
    } else if (filters.bodyType.length > 1) {
      filters.bodyType.forEach((bodyType) => {
        params.append('bodyType', bodyType);
      });
    }
    
    // Update URL with filters
    router.push(`${pathname}?${params.toString()}`);
  }, [filters, pathname, router]);
  
  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      make: '',
      model: '',
      minYear: '',
      maxYear: '',
      minPrice: '',
      maxPrice: '',
      bodyType: [],
      condition: [],
      transmission: [],
      fuelType: [],
    });
    
    router.push(pathname);
  }, [pathname, router]);

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Filter Vehicles</h2>
      
      {/* Filter Groups */}
      <div className="space-y-6">
        {/* Make Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
          <select 
            name="make"
            value={filters.make}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Any Make</option>
            {uniqueMakes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>
        
        {/* Model Filter - Dependent on Make */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <select 
            name="model"
            value={filters.model}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={!filters.make}
          >
            <option value="">Any Model</option>
            {uniqueModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        
        {/* Year Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <div className="grid grid-cols-2 gap-2">
            <select 
              name="minYear"
              value={filters.minYear}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Min Year</option>
              {uniqueYears.map(year => (
                <option key={`min-${year}`} value={year}>{year}</option>
              ))}
            </select>
            <select 
              name="maxYear"
              value={filters.maxYear}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Max Year</option>
              {uniqueYears.map(year => (
                <option key={`max-${year}`} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min Price"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max Price"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        {/* Condition Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
          <div className="space-y-2">
            {uniqueConditions.map(condition => (
              <div key={condition} className="flex items-center">
                <input
                  type="checkbox"
                  id={`condition-${condition}`}
                  name="condition"
                  value={condition}
                  checked={filters.condition.includes(condition)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={`condition-${condition}`} className="ml-2 text-sm text-gray-700">
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Body Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
          <div className="space-y-2">
            {uniqueBodyTypes.map(bodyType => (
              <div key={bodyType} className="flex items-center">
                <input
                  type="checkbox"
                  id={`bodyType-${bodyType}`}
                  name="bodyType"
                  value={bodyType}
                  checked={filters.bodyType.includes(bodyType)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={`bodyType-${bodyType}`} className="ml-2 text-sm text-gray-700">
                  {bodyType}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Transmission Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
          <div className="space-y-2">
            {uniqueTransmissions.map(transmission => (
              <div key={transmission} className="flex items-center">
                <input
                  type="checkbox"
                  id={`transmission-${transmission}`}
                  name="transmission"
                  value={transmission}
                  checked={filters.transmission.includes(transmission)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={`transmission-${transmission}`} className="ml-2 text-sm text-gray-700">
                  {transmission}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Fuel Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
          <div className="space-y-2">
            {uniqueFuelTypes.map(fuelType => (
              <div key={fuelType} className="flex items-center">
                <input
                  type="checkbox"
                  id={`fuelType-${fuelType}`}
                  name="fuelType"
                  value={fuelType}
                  checked={filters.fuelType.includes(fuelType)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={`fuelType-${fuelType}`} className="ml-2 text-sm text-gray-700">
                  {fuelType}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 space-y-3">
          <button
            onClick={applyFilters}
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
          >
            Apply Filters
          </button>
          
          <button
            onClick={resetFilters}
            className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 border border-gray-300 rounded-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;