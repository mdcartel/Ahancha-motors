'use client';

import React, { useState } from 'react';
import { Phone, Mail, Calendar, Clock } from 'lucide-react';

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
    vehicleTitle: vehicle.title
  });
  
  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        vehicleTitle: vehicle.title
      });
    } catch (error) {
      setFormStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'There was an error sending your message. Please try again.',
      });
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Interested in this vehicle?</h2>
      
      {/* Contact Options */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-primary mr-3" />
          <div>
            <div className="text-sm text-gray-500">Call or Text</div>
            <a 
              href="tel:+1-234-567-8900" 
              className="font-medium text-gray-900 hover:text-primary transition-colors"
            >
              +2547 9628-0700
            </a>
          </div>
        </div>
        
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-primary mr-3" />
          <div>
            <div className="text-sm text-gray-500">Email Us</div>
            <a 
              href="mailto:sales@premiumauto.com" 
              className="font-medium text-gray-900 hover:text-primary transition-colors"
            >
              sales@premiumauto.com
            </a>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-primary mr-3" />
          <div>
            <div className="text-sm text-gray-500">Business Hours</div>
            <div className="font-medium text-gray-900">Mon-Sat: 9am-7pm | Sun: 10am-5pm</div>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Contact Method *
          </p>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleRadioChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Email</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={handleRadioChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Phone</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="subscribedToNewsletter"
              checked={formData.subscribedToNewsletter}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Keep me updated on new inventory and special offers.
            </span>
          </label>
        </div>
        
        {formStatus.status !== 'idle' && (
          <div
            className={`p-3 rounded-md ${
              formStatus.status === 'success'
                ? 'bg-green-50 text-green-800'
                : formStatus.status === 'error'
                ? 'bg-red-50 text-red-800'
                : 'bg-blue-50 text-blue-800'
            }`}
          >
            {formStatus.message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={formStatus.status === 'submitting'}
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-70"
        >
          {formStatus.status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          By clicking "Send Message", you agree to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and consent to be contacted by our dealership.
        </p>
      </form>
    </div>
  );
};

export default VehicleContact;