'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Clock, MapPin, Search } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Inventory', 
    path: '/inventory',
    submenu: [
      { name: 'All Vehicles', path: '/inventory' },
      { name: 'New Vehicles', path: '/inventory?condition=new' },
      { name: 'Used Vehicles', path: '/inventory?condition=used' },
      { name: 'Certified Pre-Owned', path: '/inventory?condition=certified' },
    ]
  },
  { 
    name: 'Services', 
    path: '/services',
    submenu: [
      { name: 'Maintenance', path: '/services/maintenance' },
      { name: 'Repairs', path: '/services/repairs' },
      { name: 'Parts', path: '/services/parts' },
      { name: 'Detailing', path: '/services/detailing' },
    ]
  },
  { name: 'Financing', path: '/financing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  return (
    <header className="w-full z-50">
      {/* Top bar with essential information */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            {/* Contact information */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="tel:+1-234-567-8900" className="flex items-center hover:text-accent-400 transition-colors">
                <Phone size={14} className="mr-1.5" />
                <span>(234) 567-8900</span>
              </a>
              <div className="hidden md:flex items-center">
                <Clock size={14} className="mr-1.5" />
                <span>Mon-Sat: 9am-7pm | Sun: Closed</span>
              </div>
              <div className="hidden lg:flex items-center">
                <MapPin size={14} className="mr-1.5" />
                <span>123 Auto Drive, Car City</span>
              </div>
            </div>
            
            {/* Quick links */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <Link href="/careers" className="hover:text-accent-400 transition-colors">Careers</Link>
              <span className="text-gray-500">|</span>
              <Link href="/blog" className="hover:text-accent-400 transition-colors">Blog</Link>
              <span className="text-gray-500">|</span>
              <Link href="/faq" className="hover:text-accent-400 transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`
        w-full 
        ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}
        transition-all duration-300
        ${isScrolled ? 'py-3' : 'py-4'}
      `}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-gray-900">Premium</span>
                <span className="text-accent-500">Auto</span>
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <li key={link.name} className="relative group">
                    {link.submenu ? (
                      <>
                        <button 
                          className={`
                            flex items-center px-3 py-2 rounded-md text-sm font-medium
                            ${isActive(link.path) ? 'text-accent-500' : 'text-gray-700 hover:text-accent-500 hover:bg-gray-50'} 
                            transition-colors duration-200
                          `}
                          onClick={() => toggleSubmenu(link.name)}
                          aria-expanded={activeSubmenu === link.name}
                        >
                          {link.name}
                          <ChevronDown size={15} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
                        </button>
                        <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg overflow-hidden transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 origin-top transition-all duration-200 z-50">
                          <div className="py-1 border-t-2 border-accent-500">
                            {link.submenu.map((subItem) => (
                              <Link 
                                key={subItem.name} 
                                href={subItem.path}
                                className={`
                                  block px-4 py-2 text-sm
                                  ${isActive(subItem.path) 
                                    ? 'bg-gray-50 text-accent-500 font-medium' 
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-accent-500'
                                  } 
                                  transition-colors duration-150
                                `}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link 
                        href={link.path}
                        className={`
                          block px-3 py-2 rounded-md text-sm font-medium
                          ${isActive(link.path) 
                            ? 'text-accent-500' 
                            : 'text-gray-700 hover:text-accent-500 hover:bg-gray-50'
                          } 
                          transition-colors duration-150
                        `}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center">
              {/* Search button */}
              <button className="p-2 text-gray-700 hover:text-accent-500 transition-colors mr-1">
                <Search size={20} />
              </button>
              
              {/* CTA Button */}
              <div className="hidden md:block ml-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-5 py-2 rounded-md text-sm font-medium bg-accent-500 text-white hover:bg-accent-600 transition-colors shadow-sm hover:shadow-md"
                >
                  Schedule Test Drive
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 ml-3 text-gray-700 hover:text-accent-500 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        lg:hidden fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transform transition-opacity duration-300 ease-in-out
        ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={toggleMobileMenu}>
        {/* Mobile Menu Panel */}
        <div 
          className={`
            absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="p-5 border-b border-gray-200">
              <div className="text-xl font-bold">
                <span className="text-gray-900">Premium</span>
                <span className="text-accent-500">Auto</span>
              </div>
            </div>
            
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.submenu ? (
                      <div>
                        <button 
                          className={`
                            flex items-center justify-between w-full p-3 rounded-md text-left
                            ${isActive(link.path) ? 'bg-gray-100 text-accent-500' : 'text-gray-700'}
                          `}
                          onClick={() => toggleSubmenu(link.name)}
                        >
                          <span className="font-medium">{link.name}</span>
                          <ChevronDown 
                            size={18} 
                            className={`transform transition-transform duration-200 ${activeSubmenu === link.name ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        
                        <div className={`mt-1 pl-4 space-y-1 ${activeSubmenu === link.name ? 'block' : 'hidden'}`}>
                          {link.submenu.map((subItem) => (
                            <Link 
                              key={subItem.name} 
                              href={subItem.path}
                              className={`
                                block p-3 rounded-md text-sm
                                ${isActive(subItem.path) ? 'bg-gray-100 text-accent-500' : 'text-gray-600 hover:bg-gray-50'}
                              `}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={link.path}
                        className={`
                          block p-3 rounded-md
                          ${isActive(link.path) ? 'bg-gray-100 text-accent-500' : 'text-gray-700 hover:bg-gray-50'}
                        `}
                      >
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-5 border-t border-gray-200">
              <Link 
                href="/contact" 
                className="block w-full py-3 px-4 rounded-md bg-accent-500 text-white text-center font-medium hover:bg-accent-600 transition-colors"
              >
                Schedule Test Drive
              </Link>
              
              <div className="mt-6 grid grid-cols-1 gap-4">
                <a href="tel:+1-234-567-8900" className="flex items-center text-gray-700">
                  <Phone size={16} className="mr-2" />
                  <span>(234) 567-8900</span>
                </a>
                <div className="flex items-center text-gray-700">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">Mon-Sat: 9am-7pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;