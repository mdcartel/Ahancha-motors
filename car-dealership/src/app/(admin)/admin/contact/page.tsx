// app/admin/contact/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Mail, Calendar, Download, Trash2, RefreshCw, Search, Check, X, Eye, Filter } from 'lucide-react';

interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  requestType: string;
  preferredContact: string;
  subscribedToNewsletter: boolean;
  bestTimeToCall?: string;
  vehicleId?: string;
  vehicleTitle?: string;
  timestamp: string;
}

export default function ContactManagementPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewSubmission, setViewSubmission] = useState<ContactSubmission | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  
  // Fetch submissions on page load
  useEffect(() => {
    fetchSubmissions();
  }, []);
  
  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact');
      
      if (!response.ok) {
        throw new Error('Failed to fetch contact submissions');
      }
      
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      setError('Failed to load submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Filter submissions based on search term and type filter
  const filteredSubmissions = submissions
    .filter(submission => 
      // Search term filter
      searchTerm ? (
        submission.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.message.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true
    )
    .filter(submission => 
      // Type filter
      filterType === 'all' ? true : submission.requestType === filterType
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
  
  // Export submissions as CSV
  const exportCSV = () => {
    // CSV header
    let csv = 'Timestamp,First Name,Last Name,Email,Phone,Request Type,Subject,Message,Preferred Contact,Newsletter\n';
    
    // Add rows
    submissions.forEach(sub => {
      csv += `"${sub.timestamp}","${sub.firstName}","${sub.lastName}","${sub.email}","${sub.phone}","${sub.requestType}","${sub.subject.replace(/"/g, '""')}","${sub.message.replace(/"/g, '""')}","${sub.preferredContact}","${sub.subscribedToNewsletter}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle delete submission (to be implemented)
  const handleDelete = async (id: string) => {
    // In a real application, you would implement this to call your API
    alert('Delete functionality would be implemented here');
  };
  
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <MessageSquare className="mr-2 h-6 w-6 text-red-600" />
                Contact Management
              </h1>
              <p className="text-gray-600 mt-1">View and manage customer contact submissions</p>
            </div>
            
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <div className="text-red-700">{error}</div>
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
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-gray-700"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="general">General Inquiry</option>
                <option value="sales">Sales Inquiry</option>
                <option value="service">Service Inquiry</option>
              </select>
            </div>
            
            <button
              onClick={fetchSubmissions}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <RefreshCw size={16} className="mr-1" />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Submission stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Submissions</p>
                <h3 className="text-2xl font-bold text-gray-900">{submissions.length}</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-50 text-blue-500">
                <MessageSquare size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">General Inquiries</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.requestType === 'general').length}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-purple-50 text-purple-500">
                <MessageSquare size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sales Inquiries</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.requestType === 'sales').length}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-green-50 text-green-500">
                <MessageSquare size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Service Inquiries</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.requestType === 'service').length}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-yellow-50 text-yellow-500">
                <MessageSquare size={20} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Submission list */}
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredSubmissions.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {submission.firstName} {submission.lastName}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Mail size={12} className="mr-1" />
                            {submission.email}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Phone size={12} className="mr-1" />
                            {submission.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          submission.requestType === 'general'
                            ? 'bg-blue-100 text-blue-800'
                            : submission.requestType === 'sales'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {submission.requestType === 'general' 
                            ? 'General' 
                            : submission.requestType === 'sales' 
                            ? 'Sales' 
                            : 'Service'}
                        </span>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <span>{submission.preferredContact.charAt(0).toUpperCase() + submission.preferredContact.slice(1)}</span>
                          {submission.subscribedToNewsletter && (
                            <span className="ml-2 flex items-center text-green-600">
                              <Check size={12} className="mr-1" />
                              Newsletter
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {submission.subject}
                        </div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">
                          {submission.message.substring(0, 60)}...
                        </div>
                        {submission.vehicleId && (
                          <div className="text-xs text-gray-500 mt-1">
                            Vehicle: {submission.vehicleTitle}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(submission.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setViewSubmission(submission)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(index.toString())}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
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
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No submissions found</h3>
              <p className="text-gray-500">
                {searchTerm || filterType !== 'all'
                  ? `No submissions match your filters`
                  : "You haven't received any contact form submissions yet"}
              </p>
            </div>
            {(searchTerm || filterType !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Submission Detail Modal */}
      {viewSubmission && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setViewSubmission(null)}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Contact Submission Details
                    </h3>
                    
                    <div className="mt-2 space-y-4">
                      {/* Contact Information */}
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Name</p>
                            <p className="text-sm font-medium">{viewSubmission.firstName} {viewSubmission.lastName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="text-sm font-medium">{formatDate(viewSubmission.timestamp)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm font-medium">{viewSubmission.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm font-medium">{viewSubmission.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Preferred Contact</p>
                            <p className="text-sm font-medium">{viewSubmission.preferredContact}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Newsletter</p>
                            <p className="text-sm font-medium flex items-center">
                              {viewSubmission.subscribedToNewsletter ? (
                                <><Check size={16} className="mr-1 text-green-500" /> Subscribed</>
                              ) : (
                                <><X size={16} className="mr-1 text-red-500" /> Not subscribed</>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Message */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="mb-2">
                            <p className="text-xs text-gray-500">Type</p>
                            <p className="text-sm font-medium">{viewSubmission.requestType}</p>
                          </div>
                          <div className="mb-2">
                            <p className="text-xs text-gray-500">Subject</p>
                            <p className="text-sm font-medium">{viewSubmission.subject}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Message</p>
                            <p className="text-sm mt-1 whitespace-pre-line">{viewSubmission.message}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Vehicle Information (if present) */}
                      {viewSubmission.vehicleId && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Vehicle Information</h4>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-xs text-gray-500">Vehicle</p>
                            <p className="text-sm font-medium">{viewSubmission.vehicleTitle}</p>
                            <p className="text-xs text-gray-500 mt-1">ID: {viewSubmission.vehicleId}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setViewSubmission(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}