'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Phone size={16} className="shrink-0" />
              <a href="tel:+1-234-567-8900" className="hover:text-secondary transition-colors whitespace-nowrap">
                (234) 567-8900
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} className="shrink-0" />
              <span className="whitespace-nowrap">Mon-Sat: 9am-7pm | Sun: 10am-5pm</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="shrink-0" />
              <Link href="/contact" className="hover:text-secondary transition-colors whitespace-nowrap">
                123 Auto Drive, Car City, CC 12345
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div 
        className={`
          bg-white border-b border-gray-200
          ${isScrolled ? 'shadow-md sticky top-0 left-0 right-0 animate-fadeDown' : ''} 
          transition-all duration-300
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center py-2">
            {/* If you have a logo image */}
            {/* <Image 
              src="/images/logos/premium-auto-logo.svg" 
              alt="Premium Auto Dealership" 
              width={180} 
              height={40} 
              className="h-10 w-auto" 
            /> */}
            
            {/* Text logo */}
            <span className="text-2xl font-bold text-primary">Premium<span className="text-accent">Auto</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block ml-8">
            <ul className="flex">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  {link.submenu ? (
                    <div className="group">
                      <button 
                        className={`
                          flex items-center gap-1 px-4 py-4
                          ${isActive(link.path) ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'} 
                          transition-colors duration-200 group-hover:text-accent
                        `}
                        onClick={() => toggleSubmenu(link.name)}
                        aria-expanded={activeSubmenu === link.name}
                      >
                        {link.name}
                        <ChevronDown size={16} />
                      </button>
                      <div className="absolute left-0 top-full bg-white shadow-lg rounded-b-md py-2 min-w-[220px] hidden group-hover:block z-20 animate-fadeIn">
                        {link.submenu.map((subItem) => (
                          <Link 
                            key={subItem.name} 
                            href={subItem.path}
                            className={`
                              block px-5 py-2 text-[15px]
                              ${isActive(subItem.path) ? 'text-accent font-medium' : 'text-gray-700 hover:text-accent hover:bg-gray-50'} 
                              transition-colors duration-200
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
                        block px-4 py-4
                        ${isActive(link.path) ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'} 
                        transition-colors duration-200
                      `}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block ml-auto">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium bg-accent text-white hover:bg-accent-dark transition-colors shadow-sm"
            >
              Schedule Test Drive
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-700 hover:text-accent ml-4"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
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