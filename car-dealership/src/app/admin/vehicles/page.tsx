'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlusCircle, Pencil, Trash2, AlertCircle, Car, Search, RefreshCw, Check } from 'lucide-react';

interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
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
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  
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
  
  const handleDeleteVehicle = async (id: string) => {
    try {
      const response = await fetch(`/api/vehicles?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }
      
      // Remove from state
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      
      // Clear confirmation and show success message
      setDeleteConfirm(null);
      
      // Find vehicle title for success message
      const deletedVehicle = vehicles.find(vehicle => vehicle.id === id);
      if (deletedVehicle) {
        setDeleteSuccess(deletedVehicle.title);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      setError('Failed to delete vehicle. Please try again.');
    }
  };
  
  // Filter vehicles based on search term
  const filteredVehicles = searchTerm
    ? vehicles.filter(vehicle => 
        vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : vehicles;
  
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <Car className="mr-2 h-6 w-6 text-red-600" />
                Vehicle Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your vehicle inventory</p>
            </div>
            
            <Link
              href="/admin/vehicles/add"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Vehicle
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Success message */}
        {deleteSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
            <p className="font-medium text-green-800">
              <span className="font-bold">{deleteSuccess}</span> was successfully deleted.
            </p>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <p className="font-medium text-red-800">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {/* Search and controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
            />
          </div>
          
          <button
            onClick={fetchVehicles}
            className="flex items-center text-gray-600 hover:text-red-600"
          >
            <RefreshCw size={16} className="mr-1" />
            Refresh
          </button>
        </div>
        
        {/* Vehicle list */}
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredVehicles.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-16 relative flex-shrink-0">
                          <Image
                            src={vehicle.image || '/images/cars/car-placeholder.jpg'}
                            alt={vehicle.title}
                            fill
                            sizes="64px"
                            className="object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.src = '/images/cars/car-placeholder.jpg';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {vehicle.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {vehicle.id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</div>
                      <div className="text-xs text-gray-500">{vehicle.mileage.toLocaleString()} miles</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${vehicle.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicle.featured
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {vehicle.featured ? 'Featured' : 'Active'}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{vehicle.condition}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {deleteConfirm === vehicle.id ? (
                        <div className="flex items-center justify-end space-x-2">
                          <span className="text-xs text-red-600">Confirm?</span>
                          <button
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/admin/vehicles/edit/${vehicle.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(vehicle.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-gray-500 mb-4">
              <Car size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No vehicles found</h3>
              <p className="text-gray-500">
                {searchTerm
                  ? `No vehicles match "${searchTerm}"`
                  : "You haven't added any vehicles yet"}
              </p>
            </div>
            <Link
              href="/admin/vehicles/add"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Vehicle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}