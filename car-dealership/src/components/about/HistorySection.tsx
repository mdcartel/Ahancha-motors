'use client';

import React from 'react';
import Image from 'next/image';

const HistorySection = () => {
  const milestones = [
    {
      year: 2002,
      title: "Foundation",
      description: "Ahancha Motors Dealership was founded by John Anderson with a small inventory of just 15 vehicles."
    },
    {
      year: 2007,
      title: "Expansion",
      description: "Expanded our dealership to a larger location with a state-of-the-art showroom and service center."
    },
    {
      year: 2012,
      title: "10-Year Anniversary",
      description: "Celebrated our 10-year anniversary by launching our certified pre-owned program."
    },
    {
      year: 2015,
      title: "Service Excellence",
      description: "Opened our advanced service and maintenance facility with factory-trained technicians."
    },
    {
      year: 2019,
      title: "Digital Transformation",
      description: "Launched our online inventory system allowing customers to browse and purchase vehicles remotely."
    },
    {
      year: 2023,
      title: "Community Milestone",
      description: "Proudly celebrated serving over 10,000 customers in our community."
    }
  ];

  return (
    <section className="py-12 my-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-red-600/10 rounded-full"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-red-600/10 rounded-full"></div>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/images/cars/speed.png" 
                  alt="Our dealership in 2002" 
                  width={600} 
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-1 bg-red-600/10 rounded-full text-red-600 font-medium text-sm mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our History</h2>
            <p className="text-gray-700 mb-4">
              Ahancha Motors Dealership began as a small family business with a big vision. Founded in 2002 by John Anderson, 
              we started with just 15 vehicles and a commitment to honest, personalized service.
            </p>
            <p className="text-gray-700 mb-4">
              From those humble beginnings, we've grown into one of the region's most trusted dealerships, serving 
              thousands of customers and expanding our facilities to provide comprehensive automotive solutions.
            </p>
            <p className="text-gray-700">
              Throughout our growth, we've maintained our family-owned values and dedication to customer satisfaction, 
              making us a staple in the community for over two decades.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative">
                {/* Year Circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold z-10">
                  {milestone.year}
                </div>
                
                {/* Content Box */}
                <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2"></div>
                  <div className={`md:w-1/2 bg-white rounded-lg shadow-md p-6 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;