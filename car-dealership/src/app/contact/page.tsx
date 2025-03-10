import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import Map from '@/components/contact/Map';

export const metadata: Metadata = {
  title: 'Contact Us | Premium Auto Dealership',
  description: 'Contact our dealership today for sales, service, financing, or general inquiries. We are here to assist you with all your automotive needs.',
  keywords: 'car dealership contact, auto sales contact, schedule test drive, auto service appointment',
};

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-blue-200">We're here to help with your automotive needs</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <ContactInfo />
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="h-96 relative">
        <Map />
      </div>
      
      {/* Departments Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Departments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sales Department */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sales Department</h3>
              <p className="text-gray-600 mb-4">Our friendly sales team is ready to help you find your perfect vehicle.</p>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Phone:</span>
                  <a href="tel:+1-234-567-8901" className="text-primary hover:text-primary-dark transition-colors">
                    (234) 567-8901
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Email:</span>
                  <a href="mailto:sales@premiumauto.com" className="text-primary hover:text-primary-dark transition-colors">
                    sales@premiumauto.com
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Hours:</span>
                  <span className="text-gray-600">Mon-Sat: 9am-7pm | Sun: 10am-5pm</span>
                </p>
              </div>
            </div>
            
            {/* Service Department */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Service Department</h3>
              <p className="text-gray-600 mb-4">Schedule maintenance, repairs, and more with our certified technicians.</p>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Phone:</span>
                  <a href="tel:+1-234-567-8902" className="text-primary hover:text-primary-dark transition-colors">
                    (234) 567-8902
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Email:</span>
                  <a href="mailto:service@premiumauto.com" className="text-primary hover:text-primary-dark transition-colors">
                    service@premiumauto.com
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Hours:</span>
                  <span className="text-gray-600">Mon-Fri: 8am-6pm | Sat: 9am-4pm</span>
                </p>
              </div>
            </div>
            
            {/* Finance Department */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Finance Department</h3>
              <p className="text-gray-600 mb-4">Get expert assistance with financing options, leasing, and more.</p>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Phone:</span>
                  <a href="tel:+1-234-567-8903" className="text-primary hover:text-primary-dark transition-colors">
                    (234) 567-8903
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Email:</span>
                  <a href="mailto:finance@premiumauto.com" className="text-primary hover:text-primary-dark transition-colors">
                    finance@premiumauto.com
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Hours:</span>
                  <span className="text-gray-600">Mon-Sat: 9am-7pm | Sun: By Appointment</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;