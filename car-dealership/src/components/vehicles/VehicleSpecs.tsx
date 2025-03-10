'use client';

import React, { ReactNode } from 'react';

interface Spec {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface VehicleSpecsProps {
  specs: Spec[];
}

const VehicleSpecs: React.FC<VehicleSpecsProps> = ({ specs }) => {
  return (
    <div className="space-y-4">
      {specs.map((spec, index) => (
        <div key={index} className="flex items-start">
          {spec.icon && (
            <div className="mr-3 text-primary">
              {spec.icon}
            </div>
          )}
          <div>
            <div className="text-sm text-gray-500">{spec.label}</div>
            <div className="font-medium text-gray-900">{spec.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleSpecs;