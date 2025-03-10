'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

const VehicleSearch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (searchTerm) {
      current.set('search', searchTerm);
    } else {
      current.delete('search');
    }
    
    // Update the URL with the search term
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full md:w-64">
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
      />
      <button 
        type="submit"
        className="absolute left-3 top-2.5 text-gray-400 hover:text-primary"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};

export default VehicleSearch;