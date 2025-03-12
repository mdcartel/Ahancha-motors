'use client';

import React from 'react';
import { BaseImage } from './BaseImage';

interface VehicleImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
}

export const VehicleImage: React.FC<VehicleImageProps> = ({
  src,
  alt,
  fill = false,
  sizes,
  className
}) => {
  return (
    <BaseImage
      src={src || '/images/cars/car-placeholder.jpg'}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
    />
  );
};