'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample testimonial data - would typically come from an API
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Business Owner',
    image: '/images/team/testimonial-1.jpg',
    content: 'The service was exceptional from start to finish. I found the perfect car at a great price, and the financing process was smooth and easy. The staff were knowledgeable and helped me make the right decision without any pressure.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    position: 'Software Engineer',
    image: '/images/team/testimonial-2.jpg',
    content: 'I was impressed by the wide selection of vehicles and the transparent pricing. No hidden fees or surprises. My salesperson took the time to understand my needs and budget, then showed me options that fit perfectly. Will definitely return for my next car!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emma Thompson',
    position: 'Marketing Director',
    image: '/images/team/testimonial-3.jpg',
    content: 'After visiting several dealerships, I found Premium Auto to be the most professional and customer-focused. They provided detailed vehicle history reports and were honest about each car\'s condition. The follow-up service has been equally impressive.',
    rating: 4,
  },
  {
    id: '4',
    name: 'David Chen',
    position: 'Healthcare Professional',
    image: '/images/team/testimonial-4.jpg',
    content: 'As someone who knows very little about cars, I appreciated how the team explained everything in simple terms without talking down to me. They helped me find a reliable vehicle within my budget and made the entire process stress-free.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Olivia Parker',
    position: 'Teacher',
    image: '/images/team/testimonial-5.jpg',
    content: 'The service department is phenomenal! My regular maintenance visits are always handled promptly, and they\'ve saved me money by catching small issues before they became big problems. The loaner car service is also extremely convenient.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayCount = 3; // Number of testimonials to show at once
  
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with Premium Auto Dealership.
          </p>
        </div>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12">
            {visibleTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col"
              >
                {/* Star Rating */}
                <div className="flex text-yellow-400 mb-4">
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
                <p className="text-gray-700 mb-6 flex-grow">"{testimonial.content}"</p>
                
                {/* Customer Info */}
                <div className="flex items-center mt-auto">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 48px"
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/team/user-placeholder.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-8 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 mx-1 rounded-full ${
                  index === activeIndex ? 'bg-primary' : 'bg-gray-300'
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