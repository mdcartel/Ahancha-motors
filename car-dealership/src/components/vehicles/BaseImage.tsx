'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BaseImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export const BaseImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  fill = false,
  sizes,
  className,
  priority = false
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    setImageSrc('/images/cars/car-placeholder.jpg');
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      onError={handleImageError}
      priority={priority}
    />
  );
};