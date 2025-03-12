'use client';

import React, { useState } from 'react';
import { Send, Check, AlertCircle, X } from 'lucide-react';

interface NewsletterProps {
  variant?: 'default' | 'embedded' | 'footer';
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setLoading(true);
    
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Send subscription request
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: variant,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Subscription failed');
      }
      
      // Show success and reset form
      setSuccess(true);
      setEmail('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Render different variants
  if (variant === 'footer') {
    return (
      <div className={`${className}`}>
        <h3 className="text-sm font-semibold text-white mb-3">Subscribe to our newsletter</h3>
        <p className="text-xs text-gray-300 mb-3">
          Get the latest news, promotions, and automotive tips sent to your inbox.
        </p>
        
        {success ? (
          <div className="flex items-center bg-green-800 bg-opacity-20 text-green-300 rounded px-3 py-2 text-sm">
            <Check size={16} className="mr-2" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-3 py-2 text-white bg-gray-700 bg-opacity-50 rounded focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-400 text-sm"
              />
              {error && (
                <div className="absolute -bottom-6 left-0 text-xs text-red-400 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {error}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium flex items-center justify-center disabled:opacity-70 min-w-[100px]"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <Send size={14} className="mr-1" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }
  
  if (variant === 'embedded') {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 ${className}`}>
        <div className="flex items-start">
          <div className="flex-grow">
            <h3 className="text-sm font-medium text-gray-900 mb-1">Subscribe to our newsletter</h3>
            <p className="text-xs text-gray-600 mb-2">
              Stay updated with new inventory, special offers, and automotive news.
            </p>
            
            {success ? (
              <div className="flex items-center bg-green-100 text-green-800 rounded px-3 py-2 text-sm">
                <Check size={16} className="mr-2" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                  />
                  {error && (
                    <div className="text-xs text-red-600 mt-1 flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {error}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant (full width)
  return (
    <div className={`bg-gray-100 py-12 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Stay up to date with our latest vehicles, promotions, and automotive tips.
        </p>
        
        {success ? (
          <div className="bg-white border border-green-200 rounded-lg p-6 text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full text-green-600 mb-4">
              <Check size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thank You for Subscribing!</h3>
            <p className="text-gray-600 mb-4">
              You're now on the list! We'll keep you updated with our latest news and offers.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="inline-flex items-center text-green-600 hover:text-green-800"
            >
              <X size={16} className="mr-1" />
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                />
                {error && (
                  <div className="text-sm text-red-600 mt-2 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {error}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center disabled:opacity-70 min-w-[140px]"
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Subscribe
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;