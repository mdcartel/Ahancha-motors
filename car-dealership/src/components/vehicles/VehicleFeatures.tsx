'use client';

import React, { useState } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';

interface Feature {
  category: string;
  items: string[];
}

interface VehicleFeaturesProps {
  features: Feature[];
}

const VehicleFeatures: React.FC<VehicleFeaturesProps> = ({ features }) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    // Initialize all categories as expanded
    features.reduce((acc, feature) => ({ ...acc, [feature.category]: true }), {})
  );
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  return (
    <div className="space-y-6">
      {features.map((feature) => (
        <div key={feature.category} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
          <button
            onClick={() => toggleCategory(feature.category)}
            className="flex items-center justify-between w-full text-left mb-2 focus:outline-none"
          >
            <h3 className="text-lg font-semibold text-gray-900">{feature.category}</h3>
            <ChevronDown 
              className={`h-5 w-5 text-gray-500 transition-transform ${
                expandedCategories[feature.category] ? 'transform rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedCategories[feature.category] && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {feature.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VehicleFeatures;