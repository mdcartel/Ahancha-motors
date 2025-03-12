'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, Car, DollarSign, Users, Settings, Menu, X, ChevronDown, LogOut 
} from 'lucide-react';

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
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 overflow-y-auto transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
          <Link href="/admin" className="flex items-center">
            <span className="text-white text-lg font-semibold">Premium Auto Admin</span>
          </Link>
          <button 
            className="text-gray-300 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-4 px-3 space-y-1">
          <Link 
            href="/admin"
            className={`flex items-center px-3 py-2 rounded-md ${
              pathname === '/admin' 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link 
            href="/admin/vehicles"
            className={`flex items-center px-3 py-2 rounded-md ${
              pathname?.startsWith('/admin/vehicles') 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Car className="mr-3 h-5 w-5" />
            Vehicles
          </Link>
          
          {/* Additional items - can be implemented later */}
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <div className="flex items-center">
              <Users className="mr-3 h-5 w-5" />
              Customers
            </div>
            <ChevronDown size={16} />
          </button>
          
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <div className="flex items-center">
              <DollarSign className="mr-3 h-5 w-5" />
              Finance
            </div>
            <ChevronDown size={16} />
          </button>
          
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <div className="flex items-center">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </div>
            <ChevronDown size={16} />
          </button>
        </nav>
        
        <div className="absolute bottom-0 w-full px-3 py-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        {/* Top navigation */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="h-16 px-4 flex items-center justify-between">
            <button
              className="text-gray-500 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="text-lg font-semibold">Premium Auto Admin</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}