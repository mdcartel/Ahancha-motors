'use client';

import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface VehicleContactProps {
  vehicle: {
    id: string;
    title: string;
  };
}

const VehicleContact: React.FC<VehicleContactProps> = ({ vehicle }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: `Inquiry about ${vehicle.title}`,
    message: `I'm interested in this ${vehicle.title} you have listed. Please contact me with more information.`,
    requestType: 'vehicle-inquiry',
    preferredContact: 'email',
    subscribedToNewsletter: false,
    vehicleId: vehicle.id,
    vehicleTitle: vehicle.title,
    bestTimeToCall: '',
  });
  
  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus({
      status: 'submitting',
      message: 'Sending your message...',
    });
    
    try {
      // Send to your API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setFormStatus({
        status: 'success',
        message: data.message || 'Your message has been sent! We will contact you shortly.',
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: `Inquiry about ${vehicle.title}`,
        message: `I'm interested in this ${vehicle.title} you have listed. Please contact me with more information.`,
        requestType: 'vehicle-inquiry',
        preferredContact: 'email',
        subscribedToNewsletter: false,
        vehicleId: vehicle.id,
        vehicleTitle: vehicle.title,
        bestTimeToCall: '',
      });
    } catch (error) {
      setFormStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'There was an error sending your message. Please try again.',
      });
    }
  };
  
  // Show best time to call field when phone is selected
  const showBestTimeToCall = formData.preferredContact === 'phone';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="w-10 h-1 bg-red-600 mr-3"></span>
        Interested in this vehicle?
      </h2>
      
      {formStatus.status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-700 mb-4">{formStatus.message}</p>
          <button
            onClick={() => setFormStatus({ status: 'idle', message: '' })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-3 flex-shrink-0">
                <Phone className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Call or Text</div>
                <a 
                  href="tel:+254796280700" 
                  className="font-medium text-gray-900 hover:text-red-600 transition-colors"
                >
                  +254 796-280-700
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-3 flex-shrink-0">
                <Mail className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Email Us</div>
                <a 
                  href="mailto:sales@ahanchamotors.com" 
                  className="font-medium text-gray-900 hover:text-red-600 transition-colors"
                >
                  sales@ahanchamotors.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-3 flex-shrink-0">
                <Clock className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Business Hours</div>
                <div className="font-medium text-gray-900">Mon-Sat: 9am-7pm</div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  placeholder="Your first name"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  placeholder="Your last name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Your phone number"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="What would you like to know about this vehicle?"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
              />
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method *
              </p>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleRadioChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <p className="text-xs text-gray-500">We'll email you back quickly</p>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={handleRadioChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-700">Phone</span>
                    <p className="text-xs text-gray-500">We'll call you back</p>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Conditionally show best time to call field */}
            {showBestTimeToCall && (
              <div>
                <label htmlFor="bestTimeToCall" className="block text-sm font-medium text-gray-700 mb-1">
                  Best Time to Call
                </label>
                <select
                  id="bestTimeToCall"
                  name="bestTimeToCall"
                  value={formData.bestTimeToCall}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                >
                  <option value="">Select preferred time</option>
                  <option value="Morning (9am-12pm)">Morning (9am-12pm)</option>
                  <option value="Afternoon (12pm-4pm)">Afternoon (12pm-4pm)</option>
                  <option value="Evening (4pm-7pm)">Evening (4pm-7pm)</option>
                  <option value="Any time during business hours">Any time during business hours</option>
                </select>
              </div>
            )}
            
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="subscribedToNewsletter"
                  checked={formData.subscribedToNewsletter}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Keep me updated on new inventory and special offers.
                </span>
              </label>
            </div>
            
            {formStatus.status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                <p className="text-sm text-red-700">{formStatus.message}</p>
              </div>
            )}
            
            {formStatus.status === 'submitting' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-600 mr-3"></div>
                <p className="text-blue-700">Sending your message...</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={formStatus.status === 'submitting'}
              className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-70"
            >
              <Send className="h-5 w-5 mr-2" />
              {formStatus.status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              By clicking "Send Message", you agree to our <a href="/privacy" className="text-red-600 hover:underline">Privacy Policy</a> and consent to be contacted by our dealership.
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default VehicleContact;