'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

const VehicleSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      router.push(`/inventory?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by make, model, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
        />
        {searchTerm && (
          <button 
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-10 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
        <button 
          type="submit" 
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-red-600"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
};

export default VehicleSearch;