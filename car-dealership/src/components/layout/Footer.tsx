'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Ahancha<span className="text-red-600">Motors</span></h3>
            <p className="text-gray-400 mb-4">
              Your trusted dealership for new and pre-owned vehicles. We're committed to providing exceptional service and finding the perfect vehicle for your needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Home</Link>
              </li>
              <li>
                <Link href="/inventory" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Browse Inventory</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Our Services</Link>
              </li>
              <li>
                <Link href="/financing" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Financing Options</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors inline-block py-1">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#sales" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Vehicle Sales</Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Maintenance & Repairs</Link>
              </li>
              <li>
                <Link href="/services#parts" className="text-gray-400 hover:text-white transition-colors inline-block py-1">OEM Parts</Link>
              </li>
              <li>
                <Link href="/services#financing" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Financing Assistance</Link>
              </li>
              <li>
                <Link href="/services#trade-in" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Trade-In Appraisal</Link>
              </li>
              <li>
                <Link href="/services#detailing" className="text-gray-400 hover:text-white transition-colors inline-block py-1">Detailing Services</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400 flex-shrink-0" />
                <a href="tel:+254796280700" className="text-gray-400 hover:text-white transition-colors">
                  +254 796-280-700
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400 flex-shrink-0" />
                <a href="mailto:chachadaniel44@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  chachadaniel44@gmail.com
                </a>
              </li>
              <li className="mt-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Business Hours</h4>
                <p className="text-gray-400 text-sm">Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-400 text-sm">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-gray-400 text-sm">Sunday: Closed</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Restructured for better mobile display */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          {/* Powered by Chacha Technologies - Now at top for emphasis */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-800 rounded-lg px-4 py-2 inline-flex items-center">
              <span className="text-gray-300 text-sm mr-2">Powered by</span>
              <a 
                href="https://www.chach-a.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Image 
                  src="https://www.chach-a.com/logoMark.svg" 
                  alt="Chacha Technologies" 
                  width={24} 
                  height={24} 
                  className="mr-2" 
                />
                <span className="text-white text-sm font-medium">Chacha Technologies</span>
              </a>
            </div>
          </div>
          
          {/* Links and Copyright - Better spacing for mobile */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-4">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
            <p className="text-gray-500 text-sm text-center">
              &copy; {currentYear} Premium Auto Dealership. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;