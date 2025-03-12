'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Car, DollarSign, Users, ShoppingCart, 
  TrendingUp, Check, AlertTriangle, MessageSquare, Mail,
  ArrowUp, CreditCard, PlusCircle, BarChart2, FileText, Clock, ChevronRight
} from 'lucide-react';

interface DashboardStats {
  totalVehicles: number;
  featuredVehicles: number;
  newVehicles: number;
  usedVehicles: number;
  totalContactRequests: number;
  newsletterSubscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    featuredVehicles: 0,
    newVehicles: 0,
    usedVehicles: 0,
    totalContactRequests: 0,
    newsletterSubscribers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch vehicles
        const vehiclesResponse = await fetch('/api/vehicles');
        if (!vehiclesResponse.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        const vehicles = await vehiclesResponse.json();
        
        // Fetch contact submissions
        const contactResponse = await fetch('/api/contact');
        if (!contactResponse.ok) {
          throw new Error('Failed to fetch contact data');
        }
        const contactSubmissions = await contactResponse.json();
        
        // Fetch newsletter subscribers
        const newsletterResponse = await fetch('/api/newsletter');
        if (!newsletterResponse.ok) {
          throw new Error('Failed to fetch newsletter data');
        }
        const subscribers = await newsletterResponse.json();
        
        // Calculate stats
        setStats({
          totalVehicles: vehicles.length,
          featuredVehicles: vehicles.filter((v: any) => v.featured).length,
          newVehicles: vehicles.filter((v: any) => v.condition === 'New').length,
          usedVehicles: vehicles.filter((v: any) => v.condition === 'Used').length,
          totalContactRequests: contactSubmissions.length,
          newsletterSubscribers: subscribers.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  // Quick actions list
  const quickActions = [
    { icon: <Car className="text-blue-500" />, text: 'Add New Vehicle', link: '/admin/vehicles/add', bgColor: 'bg-blue-50' },
    { icon: <FileText className="text-purple-500" />, text: 'Create Report', link: '#', bgColor: 'bg-purple-50' },
    { icon: <MessageSquare className="text-green-500" />, text: 'View Inquiries', link: '/admin/contact', bgColor: 'bg-green-50' },
    { icon: <Mail className="text-red-500" />, text: 'Send Newsletter', link: '/admin/newsletter', bgColor: 'bg-red-50' },
  ];
  
  // Recent activity items
  const recentActivity = [
    { 
      icon: <Check className="text-white" />, 
      text: 'Vehicle #TC12345 was added to inventory',
      time: '2 hours ago',
      bgColor: 'bg-green-500'
    },
    { 
      icon: <CreditCard className="text-white" />, 
      text: 'New financing application received',
      time: '3 hours ago',
      bgColor: 'bg-blue-500'
    },
    { 
      icon: <AlertTriangle className="text-white" />, 
      text: 'Low inventory alert: SUVs category',
      time: '5 hours ago',
      bgColor: 'bg-amber-500'
    },
    { 
      icon: <Users className="text-white" />, 
      text: 'New customer inquiry about 2022 Honda Accord',
      time: '1 day ago',
      bgColor: 'bg-purple-500'
    },
  ];
  
  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome to Premium Auto Dealership Admin</p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            <Link href="/admin/vehicles/add" className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-colors">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Vehicle
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">Total Vehicles</span>
              <div className="p-2 rounded-lg bg-blue-50">
                <Car size={18} className="text-blue-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalVehicles}</h3>
              <span className="text-xs font-medium text-green-500 flex items-center">
                <ArrowUp size={12} className="mr-1" />
                12%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">New Vehicles</span>
              <div className="p-2 rounded-lg bg-red-50">
                <Car size={18} className="text-red-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.newVehicles}</h3>
              <span className="text-xs font-medium text-green-500 flex items-center">
                <ArrowUp size={12} className="mr-1" />
                8%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">Used Vehicles</span>
              <div className="p-2 rounded-lg bg-green-50">
                <Car size={18} className="text-green-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.usedVehicles}</h3>
              <span className="text-xs font-medium text-green-500 flex items-center">
                <ArrowUp size={12} className="mr-1" />
                15%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">Featured</span>
              <div className="p-2 rounded-lg bg-amber-50">
                <TrendingUp size={18} className="text-amber-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.featuredVehicles}</h3>
              <span className="text-xs font-medium text-green-500 flex items-center">
                <ArrowUp size={12} className="mr-1" />
                5%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">Contact Requests</span>
              <div className="p-2 rounded-lg bg-purple-50">
                <MessageSquare size={18} className="text-purple-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalContactRequests}</h3>
              <span className="text-xs font-medium text-green-500 flex items-center">
                <ArrowUp size={12} className="mr-1" />
                18%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">Newsletter</span>
              <div className="p-2 rounded-lg bg-indigo-50">
                <Mail size={18} className="text-indigo-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.newsletterSubscribers}</h3>
              <span className="text-xs font-medium text-green-500 flex items-center">
                <ArrowUp size={12} className="mr-1" />
                22%
              </span>
            </div>
          </div>
        </div>
        
        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Sales</h3>
              <div className="p-2 rounded-full bg-white/20">
                <DollarSign size={18} />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">$283,450</div>
            <div className="text-sm opacity-80">+12.5% from last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Conversion Rate</h3>
              <div className="p-2 rounded-full bg-white/20">
                <BarChart2 size={18} />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">18.3%</div>
            <div className="text-sm opacity-80">+2.4% from last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Users</h3>
              <div className="p-2 rounded-full bg-white/20">
                <Users size={18} />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">1,253</div>
            <div className="text-sm opacity-80">+8.1% from last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Avg. Response Time</h3>
              <div className="p-2 rounded-full bg-white/20">
                <Clock size={18} />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">2h 14m</div>
            <div className="text-sm opacity-80">-15% from last month</div>
          </div>
        </div>
        
        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.link}
                  className="flex items-center p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
                >
                  <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <span className="ml-4 text-gray-700 font-medium">{action.text}</span>
                  <div className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-2 rounded-lg ${activity.bgColor} text-white mr-4 mt-1`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{activity.text}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex-shrink-0 mr-1.5">
                          <Clock size={14} className="text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}