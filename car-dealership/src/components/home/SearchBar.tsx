'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    bodyType: '',
    priceRange: '',
    condition: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    
    // Navigate to inventory page with filters
    router.push(`/inventory?${queryParams.toString()}`);
  };

  return (
    <section className="bg-white py-0 relative z-20 search-bar-section">
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg -mt-24 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center md:text-left">Find Your Ideal Vehicle</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <select
                  id="make"
                  name="make"
                  value={filters.make}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-700"
                >
                  <option value="">Any Make</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="ford">Ford</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes-Benz</option>
                  <option value="audi">Audi</option>
                  <option value="lexus">Lexus</option>
                  <option value="nissan">Nissan</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <select
                  id="model"
                  name="model"
                  value={filters.model}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-700"
                >
                  <option value="">Any Model</option>
                  {filters.make === 'toyota' && (
                    <>
                      <option value="camry">Camry</option>
                      <option value="corolla">Corolla</option>
                      <option value="rav4">RAV4</option>
                      <option value="highlander">Highlander</option>
                    </>
                  )}
                  {filters.make === 'honda' && (
                    <>
                      <option value="accord">Accord</option>
                      <option value="civic">Civic</option>
                      <option value="cr-v">CR-V</option>
                      <option value="pilot">Pilot</option>
                    </>
                  )}
                </select>
              </div>
              
              <div>
                <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700 mb-1">
                  Body Type
                </label>
                <select
                  id="bodyType"
                  name="bodyType"
                  value={filters.bodyType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-700"
                >
                  <option value="">Any Body Type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="coupe">Coupe</option>
                  <option value="convertible">Convertible</option>
                  <option value="wagon">Wagon</option>
                  <option value="van">Van</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-700"
                >
                  <option value="">Any Price</option>
                  <option value="under-20000">Under $20,000</option>
                  <option value="20000-30000">$20,000 - $30,000</option>
                  <option value="30000-40000">$30,000 - $40,000</option>
                  <option value="40000-50000">$40,000 - $50,000</option>
                  <option value="over-50000">Over $50,000</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={filters.condition}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-700"
                >
                  <option value="">Any Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="certified">Certified Pre-Owned</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center md:justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-md font-medium transition-colors flex items-center shadow-md"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Vehicles
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;