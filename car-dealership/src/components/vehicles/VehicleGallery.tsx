'use client';

import React, { useState } from 'react';
import { VehicleImage } from './VehicleImage';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface VehicleGalleryProps {
  images: string[];
  title: string;
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Ensure we have at least one image, use placeholder if empty
  const galleryImages = images.length > 0 
    ? images 
    : ['/images/cars/car-placeholder.jpg'];
  
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
  };
  
  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);
  
  // Lock body scroll when lightbox is open
  React.useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);
  
  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-video mb-4 cursor-pointer" onClick={() => openLightbox(activeIndex)}>
        <VehicleImage
          src={galleryImages[activeIndex]}
          alt={`${title} - Image ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded"
        />
        
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-video cursor-pointer ${
              index === activeIndex ? 'ring-2 ring-primary' : 'hover:opacity-80'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <VehicleImage
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 5vw"
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          
          <div className="relative w-full max-w-6xl max-h-screen p-4">
            <div className="relative aspect-video">
              <VehicleImage
                src={galleryImages[activeIndex]}
                alt={`${title} - Image ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            
            <div className="absolute inset-y-0 left-4 flex items-center">
              <button
                onClick={handlePrevious}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full shadow transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button
                onClick={handleNext}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full shadow transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <div className="bg-black bg-opacity-70 px-4 py-2 rounded-full text-white text-sm">
                {activeIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleGallery;