'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';
import Image from 'next/image';

// Create a client component that uses useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get('redirect') || '/admin/vehicles';
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Check if already logged in
  useEffect(() => {
    // In a real app, you'd verify the token/cookie validity with an API call
    const adminAuth = document.cookie.includes('adminAuth=');
    if (adminAuth) {
      router.push(redirectPath);
    }
  }, [router, redirectPath]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll use hardcoded credentials
      // In a real app, this would be an API call to validate credentials
      if (username === 'admin' && password === 'password') {
        // Set a cookie (in a real app, this would be done by the server)
        document.cookie = `adminAuth=true; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week
        
        // Redirect to the requested path or default to the vehicles page
        router.push(redirectPath);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto">
              <Image
                src="/images/logo.png"
                alt="Premium Auto Dealership"
                fill
                sizes="80px"
                className="object-contain"
                onError={(e) => {
                  // If logo doesn't exist, replace with text
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">PA</div>';
                  }
                }}
              />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access the admin dashboard
          </p>
        </div>
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-red-500 group-hover:text-red-400" />
              </span>
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              For demo purposes, use: <br />
              Username: <span className="font-mono">admin</span> <br />
              Password: <span className="font-mono">password</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

// The main page component that wraps LoginForm in a Suspense boundary
export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}