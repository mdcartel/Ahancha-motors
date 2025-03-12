'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Image as ImageIcon, Plus, AlertCircle, CheckCircle, X } from 'lucide-react';

const AddVehiclePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    trim: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    exteriorColor: '',
    interiorColor: '',
    vin: '',
    stockNumber: '',
    engine: '',
    drivetrain: 'Front-Wheel Drive',
    bodyType: 'Sedan',
    condition: 'New',
    description: '',
    image: '',
    featured: false
  });
  
  // Features state
  const [featureCategories, setFeatureCategories] = useState([
    { category: 'Comfort & Convenience', items: [''] },
    { category: 'Technology', items: [''] },
    { category: 'Safety', items: [''] }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setVehicleData({ ...vehicleData, [name]: checked });
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Remove non-numeric characters except for decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    setVehicleData({ ...vehicleData, [name]: numericValue });
  };
  
  // Feature list handlers
  const handleFeatureCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...featureCategories];
    updatedCategories[index].category = value;
    setFeatureCategories(updatedCategories);
  };
  
  const handleFeatureItemChange = (categoryIndex: number, itemIndex: number, value: string) => {
    const updatedCategories = [...featureCategories];
    updatedCategories[categoryIndex].items[itemIndex] = value;
    setFeatureCategories(updatedCategories);
  };
  
  const addFeatureItem = (categoryIndex: number) => {
    const updatedCategories = [...featureCategories];
    updatedCategories[categoryIndex].items.push('');
    setFeatureCategories(updatedCategories);
  };
  
  const removeFeatureItem = (categoryIndex: number, itemIndex: number) => {
    const updatedCategories = [...featureCategories];
    updatedCategories[categoryIndex].items.splice(itemIndex, 1);
    setFeatureCategories(updatedCategories);
  };
  
  const addFeatureCategory = () => {
    setFeatureCategories([...featureCategories, { category: '', items: [''] }]);
  };
  
  const removeFeatureCategory = (categoryIndex: number) => {
    const updatedCategories = [...featureCategories];
    updatedCategories.splice(categoryIndex, 1);
    setFeatureCategories(updatedCategories);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Filter out empty feature items
      const filteredFeatures = featureCategories
        .filter(category => category.category.trim() !== '')
        .map(category => ({
          category: category.category,
          items: category.items.filter(item => item.trim() !== '')
        }))
        .filter(category => category.items.length > 0);
      
      // Create the vehicle object to submit
      const vehicleToSubmit = {
        ...vehicleData,
        price: parseFloat(vehicleData.price),
        mileage: parseInt(vehicleData.mileage),
        year: parseInt(vehicleData.year.toString()),
        features: filteredFeatures
      };
      
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleToSubmit),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add vehicle');
      }
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setVehicleData({
        make: '',
        model: '',
        trim: '',
        year: new Date().getFullYear(),
        price: '',
        mileage: '',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        exteriorColor: '',
        interiorColor: '',
        vin: '',
        stockNumber: '',
        engine: '',
        drivetrain: 'Front-Wheel Drive',
        bodyType: 'Sedan',
        condition: 'New',
        description: '',
        image: '',
        featured: false
      });
      
      setFeatureCategories([
        { category: 'Comfort & Convenience', items: [''] },
        { category: 'Technology', items: [''] },
        { category: 'Safety', items: [''] }
      ]);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin/vehicles');
      }, 2000);
      
    } catch (error) {
      console.error('Error adding vehicle:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/admin/vehicles" 
            className="flex items-center text-red-600 hover:text-red-700 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vehicle Management
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add New Vehicle</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
            <div>
              <p className="font-medium text-green-800">Vehicle Added Successfully</p>
              <p className="text-green-700">Redirecting you to the vehicle management page...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <p className="font-medium text-red-800">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                    Make *
                  </label>
                  <input
                    type="text"
                    id="make"
                    name="make"
                    value={vehicleData.make}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                    Model *
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={vehicleData.model}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="trim" className="block text-sm font-medium text-gray-700 mb-1">
                    Trim
                  </label>
                  <input
                    type="text"
                    id="trim"
                    name="trim"
                    value={vehicleData.trim}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Vehicle Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={vehicleData.year}
                  onChange={handleNumberInputChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={vehicleData.price}
                  onChange={handleNumberInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                  Mileage *
                </label>
                <input
                  type="text"
                  id="mileage"
                  name="mileage"
                  value={vehicleData.mileage}
                  onChange={handleNumberInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-1">
                  VIN
                </label>
                <input
                  type="text"
                  id="vin"
                  name="vin"
                  value={vehicleData.vin}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="stockNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Number
                </label>
                <input
                  type="text"
                  id="stockNumber"
                  name="stockNumber"
                  value={vehicleData.stockNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            
            {/* Additional Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={vehicleData.condition}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Certified">Certified Pre-Owned</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700 mb-1">
                  Body Type *
                </label>
                <select
                  id="bodyType"
                  name="bodyType"
                  value={vehicleData.bodyType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Wagon">Wagon</option>
                  <option value="Van">Van</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission *
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  value={vehicleData.transmission}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type *
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={vehicleData.fuelType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="drivetrain" className="block text-sm font-medium text-gray-700 mb-1">
                  Drivetrain
                </label>
                <select
                  id="drivetrain"
                  name="drivetrain"
                  value={vehicleData.drivetrain}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="Front-Wheel Drive">Front-Wheel Drive</option>
                  <option value="Rear-Wheel Drive">Rear-Wheel Drive</option>
                  <option value="All-Wheel Drive">All-Wheel Drive</option>
                  <option value="Four-Wheel Drive">Four-Wheel Drive</option>
                </select>
              </div>
            </div>
            
            {/* Colors and Engine */}
            <div className="space-y-4">
              <div>
                <label htmlFor="exteriorColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Exterior Color *
                </label>
                <input
                  type="text"
                  id="exteriorColor"
                  name="exteriorColor"
                  value={vehicleData.exteriorColor}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="interiorColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Interior Color
                </label>
                <input
                  type="text"
                  id="interiorColor"
                  name="interiorColor"
                  value={vehicleData.interiorColor}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="engine" className="block text-sm font-medium text-gray-700 mb-1">
                  Engine
                </label>
                <input
                  type="text"
                  id="engine"
                  name="engine"
                  value={vehicleData.engine}
                  onChange={handleInputChange}
                  placeholder="e.g. 2.5L 4-Cylinder"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={vehicleData.image}
                    onChange={handleInputChange}
                    placeholder="/images/cars/your-car-image.jpg"
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-red-500 focus:border-red-500"
                  />
                  <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md flex items-center">
                    <ImageIcon size={18} className="text-gray-500" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave empty to use a placeholder image</p>
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={vehicleData.featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Mark as Featured Vehicle
                </label>
              </div>
            </div>
            
            {/* Description */}
            <div className="lg:col-span-3">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={vehicleData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Provide a detailed description of the vehicle..."
              ></textarea>
            </div>
            
            {/* Features */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Features & Options</h2>
                <button
                  type="button"
                  onClick={addFeatureCategory}
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Category
                </button>
              </div>
              
              <div className="space-y-6">
                {featureCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={category.category}
                        onChange={(e) => handleFeatureCategoryChange(categoryIndex, e.target.value)}
                        placeholder="Category Name"
                        className="text-base font-medium p-1 border-b border-gray-300 focus:border-red-500 focus:ring-0 outline-none"
                      />
                      
                      <button
                        type="button"
                        onClick={() => removeFeatureCategory(categoryIndex)}
                        className="text-gray-400 hover:text-red-600"
                        title="Remove Category"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleFeatureItemChange(categoryIndex, itemIndex, e.target.value)}
                            placeholder="Feature item"
                            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeFeatureItem(categoryIndex, itemIndex)}
                            className="ml-2 text-gray-400 hover:text-red-600"
                            title="Remove Item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => addFeatureItem(categoryIndex)}
                        className="inline-flex items-center mt-2 text-sm text-gray-600 hover:text-red-600"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Feature
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-end">
              <Link
                href="/admin/vehicles"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md mr-4 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Vehicle
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehiclePage;