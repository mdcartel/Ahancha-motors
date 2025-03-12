'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Car, DollarSign, Users, ShoppingCart, 
  TrendingUp, Check, AlertTriangle
} from 'lucide-react';

interface DashboardStats {
  totalVehicles: number;
  featuredVehicles: number;
  newVehicles: number;
  usedVehicles: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    featuredVehicles: 0,
    newVehicles: 0,
    usedVehicles: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        
        const vehicles = await response.json();
        
        // Calculate stats
        setStats({
          totalVehicles: vehicles.length,
          featuredVehicles: vehicles.filter((v: any) => v.featured).length,
          newVehicles: vehicles.filter((v: any) => v.condition === 'New').length,
          usedVehicles: vehicles.filter((v: any) => v.condition === 'Used').length,
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
  
  // Demo quick actions list
  const quickActions = [
    { icon: <Car />, text: 'Add New Vehicle', link: '/admin/vehicles/add' },
    { icon: <TrendingUp />, text: 'View Sales Report', link: '#' },
    { icon: <ShoppingCart />, text: 'Manage Orders', link: '#' },
    { icon: <Users />, text: 'View Customer Inquiries', link: '#' },
  ];
  
  // Demo recent activity items
  const recentActivity = [
    { 
      icon: <Check className="text-green-500" />, 
      text: 'Vehicle #TC12345 was added to inventory',
      time: '2 hours ago'
    },
    { 
      icon: <DollarSign className="text-blue-500" />, 
      text: 'New financing application received',
      time: '3 hours ago'
    },
    { 
      icon: <AlertTriangle className="text-yellow-500" />, 
      text: 'Low inventory alert: SUVs category',
      time: '5 hours ago'
    },
    { 
      icon: <Users className="text-purple-500" />, 
      text: 'New customer inquiry about 2022 Honda Accord',
      time: '1 day ago'
    },
  ];
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-500">
                <Car size={24} />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Total Vehicles</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.totalVehicles}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-50 text-red-500">
                <Car size={24} />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">New Vehicles</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.newVehicles}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50 text-green-500">
                <Car size={24} />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Used Vehicles</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.usedVehicles}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-50 text-yellow-500">
                <TrendingUp size={24} />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Featured Vehicles</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.featuredVehicles}
                </h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow col-span-1">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.link}
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                      {action.icon}
                    </div>
                    <span className="ml-3 text-gray-700 font-medium">{action.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow col-span-1 lg:col-span-2">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 rounded-full bg-gray-100">
                      {activity.icon}
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
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