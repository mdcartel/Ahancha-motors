'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Clock, MapPin } from 'lucide-react';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Inventory', 
    path: '/inventory',
    submenu: [
      { name: 'All Vehicles', path: '/inventory' },
      { name: 'New Vehicles', path: '/inventory?condition=new' },
      { name: 'Used Vehicles', path: '/inventory?condition=used' },
      { name: 'Certified Pre-Owned', path: '/inventory?condition=cpo' },
    ]
  },
  { 
    name: 'Services', 
    path: '/services',
    submenu: [
      { name: 'Maintenance', path: '/services#maintenance' },
      { name: 'Repairs', path: '/services#repairs' },
      { name: 'Parts', path: '/services#parts' },
      { name: 'Detailing', path: '/services#detailing' },
    ]
  },
  { name: 'Financing', path: '/financing' },
  { name: 'About Us', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <header className="relative z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <a href="tel:+1-234-567-8900" className="hover:text-secondary transition-colors">
                (234) 567-8900
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Mon-Sat: 9am-7pm | Sun: 10am-5pm</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <Link href="/contact" className="hover:text-secondary transition-colors">
                123 Auto Drive, Car City, CC 12345
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`bg-white ${isScrolled ? 'shadow-md sticky top-0 left-0 right-0' : ''} transition-all duration-300`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Premium<span className="text-accent">Auto</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  {link.submenu ? (
                    <div className="group relative">
                      <button 
                        className={`flex items-center gap-1 px-2 py-2 ${isActive(link.path) ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'} transition-colors duration-200`}
                        onClick={() => toggleSubmenu(link.name)}
                      >
                        {link.name}
                        <ChevronDown size={16} />
                      </button>
                      <div className="absolute left-0 top-full bg-white shadow-md rounded-b-md py-2 min-w-[200px] hidden group-hover:block">
                        {link.submenu.map((subItem) => (
                          <Link 
                            key={subItem.name} 
                            href={subItem.path}
                            className={`block px-4 py-2 ${isActive(subItem.path) ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent hover:bg-gray-50'} transition-colors duration-200`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={link.path}
                      className={`block px-2 py-2 ${isActive(link.path) ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'} transition-colors duration-200`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors duration-200 bg-accent text-white hover:bg-accent-dark">
              Schedule Test Drive
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-800 hover:text-accent"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} navLinks={navLinks} activeSubmenu={activeSubmenu} toggleSubmenu={toggleSubmenu} />
    </header>
  );
};

export default Header;