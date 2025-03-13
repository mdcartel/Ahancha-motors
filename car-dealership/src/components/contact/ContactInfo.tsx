'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Calendar, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const ContactInfo: React.FC = () => {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText('123 Auto Drive, Car City, CC 12345')
      .then(() => {
        alert('Address copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };
  
  return (
    <div className="space-y-8">
      {/* Address */}
      <div className="flex">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
            <MapPin size={24} />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">Visit Our Dealership</h3>
          <p className="text-gray-600 mt-1">123 Auto Drive<br />Car City, CC 12345</p>
          <div className="mt-2 flex space-x-3">
            <button 
              onClick={handleCopyAddress}
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Copy Address
            </button>
            <a 
              href="https://maps.google.com/?q=123+Auto+Drive+Car+City+CC+12345" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
      
      {/* Phone */}
      <div className="flex">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
            <Phone size={24} />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
          <p className="text-gray-600 mt-1">Our team is available to assist you by phone.</p>
          <div className="mt-2">
            <a 
              href="tel:+1-234-567-8900" 
              className="text-primary hover:text-primary-dark transition-colors font-medium"
            >
              +2547 9628-0700
            </a>
          </div>
        </div>
      </div>
      
      {/* Email */}
      <div className="flex">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
            <Mail size={24} />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
          <p className="text-gray-600 mt-1">Send us an email and we'll respond promptly.</p>
          <div className="mt-2">
            <a 
              href="mailto:chachadaniel44@gmail.com" 
              className="text-primary hover:text-primary-dark transition-colors font-medium"
            >
              chachadaniel44@gmail.com
            </a>
          </div>
        </div>
      </div>
      
      {/* Hours */}
      <div className="flex">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
            <Clock size={24} />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
          <div className="mt-1 text-gray-600">
            <div className="flex justify-between">
              <span>Monday - Friday:</span>
              <span>9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday:</span>
              <span>9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span>10:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Appointment */}
      <div className="flex">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
            <Calendar size={24} />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">Schedule an Appointment</h3>
          <p className="text-gray-600 mt-1">Book a test drive or service appointment.</p>
          <div className="mt-2">
            <Link 
              href="/contact#appointment"
              className="text-primary hover:text-primary-dark transition-colors font-medium"
            >
              Schedule Now
            </Link>
          </div>
        </div>
      </div>
      
      {/* Social Media */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect With Us</h3>
        <div className="flex space-x-4">
          <a 
            href="https://facebook.com/premiumauto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://twitter.com/premiumauto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="https://instagram.com/premiumauto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://linkedin.com/company/premiumauto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;