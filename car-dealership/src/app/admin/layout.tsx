'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, Car, DollarSign, Users, Settings, Menu, X, ChevronDown, LogOut, 
  MessageSquare, Mail, BarChart2, CreditCard, Shield, HelpCircle, Search
} from 'lucide-react';
import Image from 'next/image';

// Skip auth check for these paths
const publicPaths = ['/admin/login'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customersExpanded, setCustomersExpanded] = useState(false);
  const [financeExpanded, setFinanceExpanded] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  
  // Check authentication status
  useEffect(() => {
    const adminAuth = document.cookie.includes('adminAuth=');
    setAuthenticated(adminAuth);
    setLoading(false);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    // Delete the auth cookie
    document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // Redirect to login page
    router.push('/admin/login');
  };
  
  // If on a public path like login, don't show the admin layout
  if (publicPaths.includes(pathname || '') || loading) {
    return <>{children}</>;
  }
  
  // If not authenticated and not on a public path, don't render anything
  // The middleware will handle the redirect
  if (!authenticated && !publicPaths.includes(pathname || '')) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-xl overflow-y-auto transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-red-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">PA</span>
            </div>
            <span className="text-gray-800 text-lg font-bold">Premium Auto</span>
          </Link>
          <button 
            className="text-gray-500 hover:text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="px-4 py-2">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
        </div>
        
        <nav className="px-4 space-y-1">
          <Link 
            href="/admin"
            className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
              pathname === '/admin' 
                ? 'bg-red-50 text-red-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="mr-3 h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/vehicles"
            className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
              pathname?.startsWith('/admin/vehicles') 
                ? 'bg-red-50 text-red-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Car className="mr-3 h-5 w-5" />
            <span className="font-medium">Vehicles</span>
          </Link>
          
          <Link 
            href="/admin/contact"
            className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
              pathname === '/admin/contact' 
                ? 'bg-red-50 text-red-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            <span className="font-medium">Contact Requests</span>
          </Link>
          
          <Link 
            href="/admin/newsletter"
            className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
              pathname === '/admin/newsletter' 
                ? 'bg-red-50 text-red-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Mail className="mr-3 h-5 w-5" />
            <span className="font-medium">Newsletter</span>
          </Link>
        </nav>
        
        <div className="px-4 py-2 mt-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Business</p>
        </div>
        
        <nav className="px-4 space-y-1">
          <div>
            <button
              onClick={() => setCustomersExpanded(!customersExpanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Users className="mr-3 h-5 w-5" />
                <span className="font-medium">Customers</span>
              </div>
              <ChevronDown size={16} className={`transition-transform ${customersExpanded ? 'transform rotate-180' : ''}`} />
            </button>
            
            {customersExpanded && (
              <div className="mt-1 ml-8 space-y-1">
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  Customer List
                </Link>
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  Leads
                </Link>
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  Testimonials
                </Link>
              </div>
            )}
          </div>
          
          <div>
            <button
              onClick={() => setFinanceExpanded(!financeExpanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <DollarSign className="mr-3 h-5 w-5" />
                <span className="font-medium">Finance</span>
              </div>
              <ChevronDown size={16} className={`transition-transform ${financeExpanded ? 'transform rotate-180' : ''}`} />
            </button>
            
            {financeExpanded && (
              <div className="mt-1 ml-8 space-y-1">
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  Loan Applications
                </Link>
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  Payments
                </Link>
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  Reports
                </Link>
              </div>
            )}
          </div>
          
          <Link href="#" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <BarChart2 className="mr-3 h-5 w-5" />
            <span className="font-medium">Analytics</span>
          </Link>
          
          <Link href="#" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <CreditCard className="mr-3 h-5 w-5" />
            <span className="font-medium">Transactions</span>
          </Link>
        </nav>
        
        <div className="px-4 py-2 mt-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">System</p>
        </div>
        
        <nav className="px-4 space-y-1">
          <div>
            <button
              onClick={() => setSettingsExpanded(!settingsExpanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Settings className="mr-3 h-5 w-5" />
                <span className="font-medium">Settings</span>
              </div>
              <ChevronDown size={16} className={`transition-transform ${settingsExpanded ? 'transform rotate-180' : ''}`} />
            </button>
            
            {settingsExpanded && (
              <div className="mt-1 ml-8 space-y-1">
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  General
                </Link>
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  Users
                </Link>
                <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg">
                  Permissions
                </Link>
              </div>
            )}
          </div>
          
          <Link href="#" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Shield className="mr-3 h-5 w-5" />
            <span className="font-medium">Security</span>
          </Link>
          
          <Link href="#" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <HelpCircle className="mr-3 h-5 w-5" />
            <span className="font-medium">Help & Support</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
        
        {/* User profile section */}
        <div className="mt-auto border-t border-gray-200">
          <div className="px-4 py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <span className="font-medium text-sm">AD</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@premiumauto.com</p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen lg:pl-72">
        {/* Top navigation */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              className="text-gray-500 focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="flex-1 flex justify-end items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  <Bell size={20} />
                </button>
              </div>
              
              <div className="border-l h-6 border-gray-200"></div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 lg:hidden">
                  <div className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <span className="font-medium text-xs">AD</span>
                  </div>
                </div>
                <button
                  className="lg:hidden ml-2 text-gray-400 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Premium Auto Dealership. All rights reserved.
            </p>
            <div className="mt-2 sm:mt-0 text-sm text-gray-500">
              Version 1.0.0
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Missing Bell component definition from import
const Bell = ({ size = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  );
};
            