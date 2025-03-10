'use client';

import React, { useState } from 'react';
import { Send, Phone, User, Mail, Calendar, MessageSquare, Check } from 'lucide-react';

const UpdatedForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    requestType: 'general',
    preferredContact: 'email',
    subscribedToNewsletter: false,
    bestTimeToCall: ''
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus({
      status: 'submitting',
      message: 'Sending your message...',
    });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({
        status: 'success',
        message: 'Your message has been sent! We will contact you shortly.',
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        requestType: 'general',
        preferredContact: 'email',
        subscribedToNewsletter: false,
        bestTimeToCall: ''
      });
    } catch (error) {
      setFormStatus({
        status: 'error',
        message: 'There was an error sending your message. Please try again.',
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form header */}
      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-600 mb-6">
        <h3 className="text-lg font-bold text-gray-900">Get in Touch</h3>
        <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
      </div>
      
      {/* Request type selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div 
          onClick={() => setFormData(prev => ({ ...prev, requestType: 'general' }))}
          className={`
            border rounded-lg p-3 text-center cursor-pointer transition-all
            ${formData.requestType === 'general' 
              ? 'border-red-600 bg-red-50 text-gray-900' 
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}
          `}
        >
          <MessageSquare className={`mx-auto h-6 w-6 mb-1 ${formData.requestType === 'general' ? 'text-red-600' : 'text-gray-400'}`} />
          <span className="text-sm font-medium">General Inquiry</span>
        </div>
        
        <div 
          onClick={() => setFormData(prev => ({ ...prev, requestType: 'sales' }))}
          className={`
            border rounded-lg p-3 text-center cursor-pointer transition-all
            ${formData.requestType === 'sales' 
              ? 'border-red-600 bg-red-50 text-gray-900' 
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}
          `}
        >
          <Calendar className={`mx-auto h-6 w-6 mb-1 ${formData.requestType === 'sales' ? 'text-red-600' : 'text-gray-400'}`} />
          <span className="text-sm font-medium">Schedule Test Drive</span>
        </div>
        
        <div 
          onClick={() => setFormData(prev => ({ ...prev, requestType: 'service' }))}
          className={`
            border rounded-lg p-3 text-center cursor-pointer transition-all
            ${formData.requestType === 'service' 
              ? 'border-red-600 bg-red-50 text-gray-900' 
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}
          `}
        >
          <Check className={`mx-auto h-6 w-6 mb-1 ${formData.requestType === 'service' ? 'text-red-600' : 'text-gray-400'}`} />
          <span className="text-sm font-medium">Service Appointment</span>
        </div>
      </div>
      
      {/* Personal information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
              placeholder="John"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
              placeholder="Doe"
            />
          </div>
        </div>
      </div>
      
      {/* Contact information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={16} className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
              placeholder="john.doe@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={16} className="text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
              placeholder="(123) 456-7890"
            />
          </div>
        </div>
      </div>
      
      {/* Best time to call - for phone contact preference */}
      {formData.preferredContact === 'phone' && (
        <div>
          <label htmlFor="bestTimeToCall" className="block text-sm font-medium text-gray-700 mb-1">
            Best Time to Call
          </label>
          <select
            id="bestTimeToCall"
            name="bestTimeToCall"
            value={formData.bestTimeToCall}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
          >
            <option value="">Select a time</option>
            <option value="morning">Morning (9AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 5PM)</option>
            <option value="evening">Evening (5PM - 7PM)</option>
          </select>
        </div>
      )}
      
      {/* Message details */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
          placeholder="How can we help you?"
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
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
          placeholder="Enter your message here..."
        />
      </div>
      
      {/* Contact preference */}
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Contact Method *
        </p>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Email</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Phone</span>
          </label>
        </div>
      </div>
      
      {/* Newsletter subscription */}
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="subscribedToNewsletter"
            checked={formData.subscribedToNewsletter}
            onChange={handleCheckboxChange}
            className="h-5 w-5 mt-0.5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <div className="ml-3">
            <span className="text-sm font-medium text-gray-900">Subscribe to newsletter</span>
            <p className="text-xs text-gray-500 mt-0.5">
              Receive updates on new inventory, special offers, and automotive news.
            </p>
          </div>
        </label>
      </div>
      
      {/* Status messages */}
      {formStatus.status !== 'idle' && (
        <div
          className={`p-4 rounded-lg flex items-start ${
            formStatus.status === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : formStatus.status === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          <div className={`rounded-full p-1 mr-3 ${
            formStatus.status === 'success'
              ? 'bg-green-100'
              : formStatus.status === 'error'
              ? 'bg-red-100'
              : 'bg-blue-100'
          }`}>
            {formStatus.status === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </div>
          <p className="text-sm">{formStatus.message}</p>
        </div>
      )}
      
      {/* Submit button */}
      <button
        type="submit"
        disabled={formStatus.status === 'submitting'}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {formStatus.status === 'submitting' ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            Sending...
          </>
        ) : (
          <>
            <Send size={16} className="mr-2" />
            Send Message
          </>
        )}
      </button>
      
      {/* Privacy note */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our <a href="/privacy" className="text-red-600 hover:underline">Privacy Policy</a> and consent to be contacted regarding your inquiry.
      </p>
    </form>
  );
};

export default UpdatedForm;