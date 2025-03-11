import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Car, Calendar } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import Map from '@/components/contact/Map';

export const metadata: Metadata = {
  title: 'Contact Us | Premium Auto Dealership',
  description: 'Contact Premium Auto Dealership. Reach out to our sales, service, or financing team with questions or to schedule a test drive.',
};

export default function ContactPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Page Header */}
      {/* <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Contact Us</h1>
          <p className="text-gray-300">Reach out to us with any questions or to schedule a test drive</p>
        </div>
      </div> */}
       <div className="relative bg-gray-900 text-white">
                      <div className="absolute inset-0 z-0 opacity-30">
                        <Image 
                          src="/images/backgrounds/bmw.png" 
                          alt="Premium Auto Dealership" 
                          fill 
                          className="object-cover xl:object-left"
                          priority
                        />
                      </div>
                      <div className="relative z-10 container mx-auto px-4 py-20">
                        <div className="max-w-3xl">
                          <div className="inline-block px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
                          Contact Us
                          </div>
                          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us Now!</h1>
                          <p className="text-lg text-gray-300">
                          Reach out to us with any questions or to schedule a test drive
                          </p>
                        </div>
                      </div>
                    </div>

      {/* Contact Information and Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Our Dealership</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-600/10 p-2 rounded-full mr-4">
                    <MapPin size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">123 Auto Drive</p>
                    <p className="text-gray-600">Car City, CC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-600/10 p-2 rounded-full mr-4">
                    <Phone size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">Sales: +2547 9628-0700</p>
                    <p className="text-gray-600">Service: (234) 567-8901</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-600/10 p-2 rounded-full mr-4">
                    <Mail size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">sales@premiumauto.com</p>
                    <p className="text-gray-600">service@premiumauto.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-600/10 p-2 rounded-full mr-4">
                    <Clock size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Hours</h3>
                    <p className="text-gray-600">Mon-Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
              
              <div className="space-y-3">
                <a 
                  href="/inventory" 
                  className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                >
                  <Car size={18} className="mr-2" />
                  <span>View Inventory</span>
                </a>
                
                <a 
                  href="/services" 
                  className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                >
                  <Clock size={18} className="mr-2" />
                  <span>Schedule Service</span>
                </a>
                
                <a 
                  href="/financing" 
                  className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                >
                  <Calendar size={18} className="mr-2" />
                  <span>Apply for Financing</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form and Map */}
          <div className="lg:col-span-2">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <ContactForm />
            </div>
            
            {/* Map */}
            {/* <div>
              <Map />
              </div> */}
          </div>
        </div>
      </div>
      
      {/* Departments */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Departments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sales Department */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sales Department</h3>
            <p className="text-gray-600 mb-4">Our sales team is dedicated to helping you find the perfect vehicle to fit your needs and budget.</p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Phone size={16} className="mr-2" />
                <span>+2547 9628-0700</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail size={16} className="mr-2" />
                <span>sales@premiumauto.com</span>
              </div>
            </div>
          </div>
          
          {/* Service Department */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Service Department</h3>
            <p className="text-gray-600 mb-4">Our certified technicians are ready to provide the best care for your vehicle, from routine maintenance to complex repairs.</p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Phone size={16} className="mr-2" />
                <span>(234) 567-8901</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail size={16} className="mr-2" />
                <span>service@premiumauto.com</span>
              </div>
            </div>
          </div>
          
          {/* Finance Department */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Finance Department</h3>
            <p className="text-gray-600 mb-4">Our finance experts will work with you to find the best financing or leasing options tailored to your needs.</p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Phone size={16} className="mr-2" />
                <span>(234) 567-8902</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail size={16} className="mr-2" />
                <span>finance@premiumauto.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}