'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bell, ArrowRight, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const ComingSoon = () => {
  // Launch countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set launch date - 30 days from now
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Notification form state
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    setIsSubmitted(true);
    setEmail('');
  };

  // Timer block component
  const TimerBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-md rounded-lg w-16 h-16 flex items-center justify-center mb-2">
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <span className="text-white/70 text-sm">{label}</span>
    </div>
  );

  return (
    <section className="relative z-10 overflow-hidden bg-gray-900 min-h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/hero-car-bg.jpg"
          alt="Luxury car background"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/90"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute right-1/3 top-1/4 w-64 h-64 border border-red-500/20 rounded-full"></div>
        <div className="absolute left-1/4 bottom-1/4 w-48 h-48 border border-white/10 rounded-full"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-white">
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white mb-4">
              <span className="text-sm font-semibold tracking-wide">Coming Soon</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight text-white">
              Luxury Auto <span className="text-red-500">Experience</span> <span className="text-white">Arrives</span>
            </h1>
            
            <p className="text-white text-lg mb-8 max-w-lg leading-relaxed">
              We're putting the finishing touches on our premium automotive experience. 
              Be the first to know when we unveil our exclusive collection of luxury vehicles.
            </p>
            
            {/* Countdown timer */}
            <div className="mb-8">
              <h3 className="text-white/80 mb-4 text-lg font-medium">Launching In:</h3>
              <div className="flex space-x-4">
                <TimerBlock value={timeLeft.days} label="Days" />
                <TimerBlock value={timeLeft.hours} label="Hours" />
                <TimerBlock value={timeLeft.minutes} label="Minutes" />
                <TimerBlock value={timeLeft.seconds} label="Seconds" />
              </div>
            </div>
            
            {/* Notification form */}
            {!isSubmitted ? (
              <div className="mb-8">
                <h3 className="text-white/80 mb-3 text-lg font-medium">Get Notified When We Launch:</h3>
                <form onSubmit={handleSubmit} className="flex max-w-md">
                  <div className="relative flex-grow">
                    <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-l-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-r-lg bg-red-600 text-white text-center font-medium transition-all shadow-md hover:bg-red-700 flex items-center"
                  >
                    <Bell size={16} className="mr-2" />
                    Notify Me
                  </button>
                </form>
              </div>
            ) : (
              <div className="mb-8 bg-white/10 rounded-lg p-4 flex items-center max-w-md">
                <div className="bg-green-500 p-1 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="text-white">Thank you! We'll notify you when we launch.</p>
              </div>
            )}
            
            {/* Social media links */}
            <div>
              <h3 className="text-white/80 mb-3 text-lg font-medium">Follow Our Journey:</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full">
                  <Instagram size={20} className="text-white" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full">
                  <Facebook size={20} className="text-white" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full">
                  <Twitter size={20} className="text-white" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Right column - Car teaser */}
          <div className="hidden lg:block relative">
            {/* Blurred/silhouette car image */}
            <div className="relative">
              <Image
                src="/images/cars/maz.png" 
                alt="Coming soon vehicle silhouette"
                width={600}
                height={350}
                className="object-contain opacity-80 drop-shadow-2xl"
              />
              
              {/* Decorative blur overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50"></div>
              
              {/* Coming soon overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 bg-red-600/90 px-8 py-3 rounded-lg">
                <span className="font-bold text-white text-xl tracking-wider">COMING SOON</span>
              </div>
            </div>
            
            {/* "Sneak peek" floating badge */}
            <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20 shadow-lg">
              <span className="text-white text-sm font-medium">Sneak Peek</span>
            </div>
            
            {/* Features teaser card */}
            <div className="absolute bottom-8 -left-4 bg-white/15 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-lg max-w-xs">
              <h4 className="text-white font-medium mb-2">Exciting Features Coming:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-white/80 text-sm">
                  <ArrowRight size={14} className="text-red-500 mr-2" />
                  Premium Selection of Luxury Vehicles
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <ArrowRight size={14} className="text-red-500 mr-2" />
                  Virtual Showroom Experience
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <ArrowRight size={14} className="text-red-500 mr-2" />
                  Exclusive Launch Day Offers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;