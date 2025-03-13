'use client';

import React from 'react';

const Map: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* 
        This would typically be replaced with a real map integration like Google Maps or Mapbox.
        For this example, we're using an iframe with OpenStreetMap as a placeholder.
      */}
      <iframe 
        src="https://www.openstreetmap.org/export/embed.html?bbox=-97.84400939941408%2C30.223542649578778%2C-97.70790100097658%2C30.307740434892704&amp;layer=mapnik" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }}
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Map of Ahancha Motors Dealership"
        className="absolute inset-0"
      ></iframe>
      
      {/* Overlay with dealership information */}
      <div className="absolute top-4 left-4 bg-white p-4 shadow-md rounded-md max-w-xs z-10">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Ahancha Motors Dealership</h3>
        <p className="text-gray-600 mb-2">123 Auto Drive<br />Car City, CC 12345</p>
        <a 
          href="https://maps.google.com/?q=123+Auto+Drive+Car+City+CC+12345" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default Map;