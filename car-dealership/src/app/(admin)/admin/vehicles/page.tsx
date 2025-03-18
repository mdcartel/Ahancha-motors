'use client';

import React, { useState, useEffect } from 'react';
import { 
  Car, Plus, Search, RefreshCw, Filter, ChevronDown,
  AlertTriangle, Trash2, Edit, Eye, CheckCircle, XCircle,
  ArrowUp, ArrowDown, MoreHorizontal, Tag, Calendar, Gauge
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  price: number;
  mileage: number;
  condition: string;
  image: string;
  featured?: boolean;
  createdAt?: string;
}

export default function VehicleManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Fetch vehicles on page load
  useEffect(() => {
    fetchVehicles();
  }, []);
  
  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/vehicles');
      
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setError('Failed to load vehicles. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Filter and sort vehicles
  const filteredVehicles = vehicles
    .filter(vehicle => 
      // Search filter
      searchTerm ? 
        vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.year.toString().includes(searchTerm)
      : true
    )
    .filter(vehicle => 
      // Condition filter
      filterCondition === 'all' ? true : vehicle.condition === filterCondition
    )
    .sort((a, b) => {
      // Sorting
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'oldest':
          return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'mileage-low':
          return a.mileage - b.mileage;
        case 'mileage-high':
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });
  
  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-red-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Vehicle Management</h1>
            </div>
            <p className="text-gray-500 mt-1">Manage your vehicle inventory</p>
          </div>
          
          <Link 
            href="/admin/vehicles/add" 
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Vehicle
          </Link>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <p className="font-medium text-red-800">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {/* Search and filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="p-5">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                />
              </div>
              
              {/* Filter/Sort buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                  <ChevronDown size={16} className={`transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <button
                  onClick={fetchVehicles}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <RefreshCw size={18} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>
            
            {/* Expanded filters */}
            {isFiltersOpen && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                    <select
                      value={filterCondition}
                      onChange={(e) => setFilterCondition(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                    >
                      <option value="all">All Conditions</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Certified">Certified Pre-Owned</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="mileage-low">Mileage: Low to High</option>
                      <option value="mileage-high">Mileage: High to Low</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilterCondition('all');
                        setSortBy('newest');
                      }}
                      className="px-4 py-2.5 text-gray-600 hover:text-gray-900"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Vehicle list */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : filteredVehicles.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-14 w-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                            <Image
                              src={vehicle.image || '/images/vehicles/placeholder.jpg'}
                              alt={vehicle.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {vehicle.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {vehicle.id.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col text-sm">
                          <div className="flex items-center text-gray-900">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            <span>{vehicle.year}</span>
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <Gauge className="h-4 w-4 mr-1 text-gray-400" />
                            <span>{vehicle.mileage.toLocaleString()} miles</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base font-semibold text-gray-900">
                          ${vehicle.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col items-center">
                          {vehicle.featured ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          ) : (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          )}
                          <span className="mt-1 text-xs text-gray-500">{vehicle.condition}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/admin/vehicles/edit/${vehicle.id}`}
                            className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors"
                            title="Edit vehicle"
                          >
                            <Edit size={16} />
                          </Link>
                          <Link
                            href={`/inventory/${vehicle.id}`}
                            className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                            title="View vehicle"
                            target="_blank"
                          >
                            <Eye size={16} />
                          </Link>
                          <button
                            className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                            title="Delete vehicle"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-sm text-gray-500">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full text-gray-500 mb-4">
              <Car size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Vehicles Found</h3>
            {searchTerm || filterCondition !== 'all' ? (
              <>
                <p className="text-gray-500 mb-6">
                  No results match your current filters. Try adjusting your search or clear the filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCondition('all');
                  }}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Clear Filters
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-500 mb-6">
                  You haven't added any vehicles to your inventory yet.
                </p>
                <Link
                  href="/admin/vehicles/add"
                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Vehicle
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}