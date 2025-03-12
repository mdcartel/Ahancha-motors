'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Updated testimonial data with Kenyan names
const testimonials = [
  {
    id: '1',
    name: 'Faith Wangari',
    position: 'Business Owner',
    content: 'The service at Ahancha Motors was exceptional from start to finish. I found the perfect car at a great price, and the financing process was smooth and easy. The staff were knowledgeable and helped me make the right decision without any pressure.',
    rating: 5,
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  {
    id: '2',
    name: 'Daniel Omondi',
    position: 'Software Engineer',
    content: 'I was impressed by the wide selection of vehicles and the transparent pricing. No hidden fees or surprises. My salesperson took the time to understand my needs and budget, then showed me options that fit perfectly. Will definitely return for my next car!',
    rating: 5,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    id: '3',
    name: 'Esther Kamau',
    position: 'Marketing Director',
    content: 'After visiting several dealerships, I found Ahancha Motors to be the most professional and customer-focused. They provided detailed vehicle history reports and were honest about each car\'s condition. The follow-up service has been equally impressive.',
    rating: 4,
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: '4',
    name: 'Brian Kipchoge',
    position: 'Healthcare Professional',
    content: 'As someone who knows very little about cars, I appreciated how the team explained everything in simple terms without talking down to me. They helped me find a reliable vehicle within my budget and made the entire process stress-free.',
    rating: 5,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
  {
    id: '5',
    name: 'Nancy Njeri',
    position: 'Teacher',
    content: 'The service department is phenomenal! My regular maintenance visits are always handled promptly, and they\'ve saved me money by catching small issues before they became big problems. The loaner car service is also extremely convenient.',
    rating: 5,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
];

// Function to get initials from a name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const displayCount = 3; // Number of testimonials to show at once on desktop
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, autoplay]);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  // Create a circular array of testimonials starting from activeIndex
  const visibleTestimonials = [...testimonials.slice(activeIndex), ...testimonials.slice(0, activeIndex)].slice(0, displayCount);

  // Handle hover events for autoplay
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto my-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with Ahancha Motors.
          </p>
        </div>
        
        <div 
          className="relative" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200 hover:scale-110 hidden md:flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200 hover:scale-110 hidden md:flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 md:px-8">
            {visibleTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-8 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col relative transform hover:-translate-y-1"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4">
                  <div className={`${testimonial.bgColor} ${testimonial.textColor} p-3 rounded-full`}>
                    <Quote size={18} />
                  </div>
                </div>
                
                {/* Star Rating */}
                <div className="flex text-yellow-400 mb-4 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
                
                {/* Testimonial Content */}
                <p className="text-gray-700 mb-6 flex-grow italic">"{testimonial.content}"</p>
                
                {/* Customer Info */}
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <div className={`h-12 w-12 rounded-full overflow-hidden mr-4 flex items-center justify-center ${testimonial.bgColor} ${testimonial.textColor} font-bold text-lg`}>
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full mx-1 transition-all duration-200 ${
                  index === activeIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;