// app/admin/newsletter/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Download, Trash2, RefreshCw, Search, X, AlertCircle, Check, Calendar, Filter, Send } from 'lucide-react';

interface NewsletterSubscriber {
  email: string;
  name?: string;
  timestamp: string;
  source?: string;
  interests?: string[];
}

export default function NewsletterManagementPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState({
    email: '',
    name: '',
    source: 'admin'
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState(false);
  
  // Fetch subscribers on page load
  useEffect(() => {
    fetchSubscribers();
  }, []);
  
  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/newsletter');
      
      if (!response.ok) {
        throw new Error('Failed to fetch newsletter subscribers');
      }
      
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      setError('Failed to load subscribers. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle unsubscribe
  const handleUnsubscribe = async (email: string) => {
    try {
      const response = await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to unsubscribe email');
      }
      
      // Remove from state
      setSubscribers(subscribers.filter(subscriber => subscriber.email !== email));
      
      // Clear confirmation and show success message
      setDeleteConfirm(null);
      setDeleteSuccess(email);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setDeleteSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Error unsubscribing email:', error);
      setError('Failed to unsubscribe email. Please try again.');
    }
  };

  // Handle adding a new subscriber
  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    
    // Basic validation
    if (!newSubscriber.email) {
      setAddError('Email is required');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newSubscriber.email)) {
      setAddError('Please enter a valid email address');
      return;
    }
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubscriber),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add subscriber');
      }
      
      // Show success and reset form
      setAddSuccess(true);
      setNewSubscriber({
        email: '',
        name: '',
        source: 'admin'
      });
      
      // Refresh subscriber list
      fetchSubscribers();
      
      // Hide form after 2 seconds
      setTimeout(() => {
        setAddSuccess(false);
        setShowAddForm(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding subscriber:', error);
      setAddError(error instanceof Error ? error.message : 'Failed to add subscriber');
    }
  };
  
  // Filter subscribers based on search term and source filter
  const filteredSubscribers = subscribers
    .filter(subscriber => 
      // Search term filter
      searchTerm ? (
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (subscriber.name && subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()))
      ) : true
    )
    .filter(subscriber => 
      // Source filter
      filterSource === 'all' ? true : subscriber.source === filterSource
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Export subscribers as CSV
  const exportCSV = () => {
    // CSV header
    let csv = 'Email,Name,Date,Source\n';
    
    // Add rows
    subscribers.forEach(sub => {
      csv += `"${sub.email}","${sub.name || ''}","${sub.timestamp}","${sub.source || ''}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get unique sources for filter dropdown
  const uniqueSources = Array.from(new Set(subscribers.map(sub => sub.source || 'Unknown')));
  
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <Mail className="mr-2 h-6 w-6 text-red-600" />
                Newsletter Subscribers
              </h1>
              <p className="text-gray-600 mt-1">Manage your newsletter subscription list</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {showAddForm ? 'Cancel' : 'Add Subscriber'}
              </button>
              <button
                onClick={exportCSV}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Add Subscriber Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Subscriber</h2>
            
            {addSuccess ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>Subscriber added successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleAddSubscriber} className="space-y-4">
                {addError && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{addError}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newSubscriber.email}
                      onChange={(e) => setNewSubscriber({...newSubscriber, email: e.target.value})}
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name (optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newSubscriber.name}
                      onChange={(e) => setNewSubscriber({...newSubscriber, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                    Source
                  </label>
                  <select
                    id="source"
                    name="source"
                    value={newSubscriber.source}
                    onChange={(e) => setNewSubscriber({...newSubscriber, source: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  >
                    <option value="admin">Admin Entry</option>
                    <option value="website">Website Form</option>
                    <option value="contact">Contact Form</option>
                    <option value="import">Imported</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Add Subscriber
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        
        {/* Success message */}
        {deleteSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
            <p className="font-medium text-green-800">
              <span className="font-bold">{deleteSuccess}</span> was successfully unsubscribed.
            </p>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <p className="font-medium text-red-800">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="all">All Sources</option>
                {uniqueSources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={fetchSubscribers}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <RefreshCw size={16} className="mr-1" />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Subscribers</p>
                <h3 className="text-2xl font-bold text-gray-900">{subscribers.length}</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-50 text-blue-500">
                <Mail size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Website Form</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {subscribers.filter(s => s.source === 'website').length}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-green-50 text-green-500">
                <Mail size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Contact Form</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {subscribers.filter(s => s.source === 'contact').length}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-yellow-50 text-yellow-500">
                <Mail size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Last 30 Days</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {subscribers.filter(s => {
                    const date = new Date(s.timestamp);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return date >= thirtyDaysAgo;
                  }).length}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-purple-50 text-purple-500">
                <Calendar size={20} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Subscriber list */}
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredSubscribers.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscribed
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscribers.map((subscriber, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <Mail size={16} className="mr-2 text-gray-400" />
                          {subscriber.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {subscriber.name || <span className="text-gray-400">Not provided</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subscriber.source === 'website'
                            ? 'bg-blue-100 text-blue-800'
                            : subscriber.source === 'contact'
                            ? 'bg-green-100 text-green-800'
                            : subscriber.source === 'footer'
                            ? 'bg-purple-100 text-purple-800'
                            : subscriber.source === 'admin'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscriber.source || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          {formatDate(subscriber.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {deleteConfirm === subscriber.email ? (
                          <div className="flex items-center justify-end space-x-2">
                            <span className="text-xs text-red-600">Confirm?</span>
                            <button
                              onClick={() => handleUnsubscribe(subscriber.email)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(subscriber.email)}
                            className="text-red-600 hover:text-red-900"
                            title="Unsubscribe"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-gray-500 mb-4">
              <Mail size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No subscribers found</h3>
              <p className="text-gray-500">
                {searchTerm || filterSource !== 'all'
                  ? `No subscribers match your filters`
                  : "You don't have any newsletter subscribers yet"}
              </p>
            </div>
            {(searchTerm || filterSource !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterSource('all');
                }}
                className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </button>
            )}
          </div>
        )}
        
        {/* Show subscriber count and pagination info */}
        {filteredSubscribers.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredSubscribers.length} of {subscribers.length} total subscribers
            {searchTerm && ` (filtered by "${searchTerm}")`}
            {filterSource !== 'all' && ` (filtered by source: ${filterSource})`}
          </div>
        )}
      </div>
    </div>
  );
}