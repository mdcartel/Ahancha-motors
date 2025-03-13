'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Clock, MapPin, Search } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Inventory', 
    path: '/inventory',
    submenu: [
      { name: 'All Vehicles', path: '/inventory' },
      { name: 'New Vehicles', path: '/inventory?condition=New' },
      { name: 'Used Vehicles', path: '/inventory?condition=Used' },
      { name: 'Certified Pre-Owned', path: '/inventory?condition=Certified Pre-Owned' },
    ]
  },
  { 
    name: 'Services', 
    path: '/services',
  },
  { name: 'Financing', path: '/financing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement | null> }>({});

  // Initialize refs for each dropdown
  useEffect(() => {
    navLinks.forEach(link => {
      if (link.submenu) {
        dropdownRefs.current[link.name] = React.createRef();
      }
    });
  }, []);

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

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDesktopSubmenu) {
        const dropdownRef = dropdownRefs.current[openDesktopSubmenu];
        if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpenDesktopSubmenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDesktopSubmenu]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  const toggleDesktopSubmenu = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDesktopSubmenu(openDesktopSubmenu === name ? null : name);
  };

  const isActive = (path: string) => {
    // Base path check (for main navigation)
    if (path === '/') {
      return pathname === path;
    }
    
    // For inventory items with query parameters
    if (path.startsWith('/inventory?')) {
      // Check if current path is inventory page first
      if (!pathname?.startsWith('/inventory')) {
        return false;
      }
      
      // Extract condition from the path
      const conditionMatch = path.match(/condition=([^&]*)/);
      if (conditionMatch && typeof window !== 'undefined') {
        // Check URL parameters in current page
        const currentUrl = new URL(window.location.href);
        const currentCondition = currentUrl.searchParams.get('condition');
        return currentCondition === conditionMatch[1];
      }
      return false;
    }
    
    // Default check for regular paths
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
              <a href="tel:+254796280700" className="flex items-center hover:text-red-400 transition-colors">
                <Phone size={14} className="mr-1.5" />
                <span>+254 796-280-700</span>
              </a>
              <div className="hidden md:flex items-center">
                <Clock size={14} className="mr-1.5" />
                <span>Mon-Sat: 9am-7pm | Sun: Closed</span>
              </div>
              
            </div>
            
            {/* Quick links */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <Link href="/coming" className="hover:text-red-400 transition-colors">Blog</Link>
              <span className="text-gray-500">|</span>
              <Link href="/coming" className="hover:text-red-400 transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={isScrolled 
        ? "w-full bg-white shadow-md py-3 transition-all duration-300" 
        : "w-full bg-white/80 backdrop-blur-md py-4 transition-all duration-300"
      }>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-gray-900">Ahancha</span>
                <span className="text-red-600">Motors</span>
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <li key={link.name} className="relative">
                    {link.submenu ? (
                      <div ref={link.submenu ? dropdownRefs.current[link.name] : undefined}>
                        <button 
                          className={isActive(link.path) 
                            ? "flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 transition-colors duration-200" 
                            : "flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors duration-200"
                          }
                          onClick={(e) => toggleDesktopSubmenu(link.name, e)}
                          aria-expanded={openDesktopSubmenu === link.name}
                        >
                          {link.name}
                          <ChevronDown 
                            size={15} 
                            className={openDesktopSubmenu === link.name 
                              ? "ml-1 transition-transform duration-200 rotate-180" 
                              : "ml-1 transition-transform duration-200"
                            } 
                          />
                        </button>
                        <div 
                          className={openDesktopSubmenu === link.name 
                            ? "absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-200 z-50 opacity-100 visible" 
                            : "absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-200 z-50 opacity-0 invisible"
                          }
                        >
                          <div className="py-1 border-t-2 border-red-600">
                            {link.submenu.map((subItem) => (
                              <a 
                                key={subItem.name} 
                                href={subItem.path}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenDesktopSubmenu(null);
                                  window.location.href = subItem.path;
                                }}
                                className={isActive(subItem.path) 
                                  ? "block px-4 py-2 text-sm bg-gray-50 text-red-600 font-medium transition-colors duration-150" 
                                  : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150"
                                }
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={link.path}
                        className={isActive(link.path) 
                          ? "block px-3 py-2 rounded-md text-sm font-medium text-red-600 transition-colors duration-150" 
                          : "block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors duration-150"
                        }
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
              <button className="p-2 text-gray-700 hover:text-red-600 transition-colors mr-1">
                <Search size={20} />
              </button>
              
              {/* CTA Button */}
              <div className="hidden md:block ml-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-5 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm hover:shadow-md"
                >
                  Schedule Test Drive
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 ml-3 text-gray-700 hover:text-red-600 transition-colors"
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
      <div 
        className={isMobileMenuOpen 
          ? "lg:hidden fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transform transition-opacity duration-300 ease-in-out opacity-100" 
          : "lg:hidden fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transform transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none"
        } 
        onClick={toggleMobileMenu}
      >
        {/* Mobile Menu Panel */}
        <div 
          className={isMobileMenuOpen 
            ? "absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0" 
            : "absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out translate-x-full"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="p-5 border-b border-gray-200">
              <div className="text-xl font-bold">
                <span className="text-gray-900">Ahancha</span>
                <span className="text-red-600">Motors</span>
              </div>
            </div>
            
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.submenu ? (
                      <div>
                        <button 
                          className={isActive(link.path) 
                            ? "flex items-center justify-between w-full p-3 rounded-md text-left bg-gray-100 text-red-600" 
                            : "flex items-center justify-between w-full p-3 rounded-md text-left text-gray-700"
                          }
                          onClick={() => toggleSubmenu(link.name)}
                        >
                          <span className="font-medium">{link.name}</span>
                          <ChevronDown 
                            size={18} 
                            className={activeSubmenu === link.name 
                              ? "transform transition-transform duration-200 rotate-180" 
                              : "transform transition-transform duration-200"
                            } 
                          />
                        </button>
                        
                        <div className={activeSubmenu === link.name ? "mt-1 pl-4 space-y-1 block" : "mt-1 pl-4 space-y-1 hidden"}>
                          {link.submenu.map((subItem) => (
                            <a 
                              key={subItem.name} 
                              href={subItem.path}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleMobileMenu();
                                window.location.href = subItem.path;
                              }}
                              className={isActive(subItem.path) 
                                ? "block p-3 rounded-md text-sm bg-gray-100 text-red-600" 
                                : "block p-3 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                              }
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={link.path}
                        className={isActive(link.path) 
                          ? "block p-3 rounded-md bg-gray-100 text-red-600" 
                          : "block p-3 rounded-md text-gray-700 hover:bg-gray-50"
                        }
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
                className="block w-full py-3 px-4 rounded-md bg-red-600 text-white text-center font-medium hover:bg-red-700 transition-colors"
              >
                Schedule Test Drive
              </Link>
              
              <div className="mt-6 grid grid-cols-1 gap-4">
                <a href="tel:+254796280700" className="flex items-center text-gray-700">
                  <Phone size={16} className="mr-2" />
                  <span>+254 796-280-700</span>
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
