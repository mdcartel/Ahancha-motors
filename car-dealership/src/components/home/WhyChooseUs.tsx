'use client';

import React from 'react';
import { Check, Award, ThumbsUp, ShieldCheck, DollarSign, Headphones } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <Award className="h-10 w-10 text-accent-500" />,
      title: 'Premium Selection',
      description: 'Hand-picked inventory of quality vehicles that meet our rigorous standards.'
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-accent-500" />,
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes a comprehensive multi-point inspection.'
    },
    {
      icon: <DollarSign className="h-10 w-10 text-accent-500" />,
      title: 'Competitive Pricing',
      description: 'Transparent, market-based pricing with no hidden fees or surprises.'
    },
    {
      icon: <Headphones className="h-10 w-10 text-accent-500" />,
      title: 'Dedicated Support',
      description: 'Our experienced team is committed to exceptional customer service.'
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-accent-500" />,
      title: 'Easy Financing',
      description: 'Flexible financing options tailored to your needs and budget.'
    },
    {
      icon: <Check className="h-10 w-10 text-accent-500" />,
      title: 'Hassle-Free Experience',
      description: 'Streamlined buying process with no pressure sales tactics.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PremiumAuto</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're dedicated to providing an exceptional car buying experience with unmatched quality and service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;