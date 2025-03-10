'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp, Phone, Clock, MapPin } from 'lucide-react';

interface NavLink {
  name: string;
  path: string;
  submenu?: { name: string; path: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  activeSubmenu: string | null;
  toggleSubmenu: (name: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navLinks,
  activeSubmenu,
  toggleSubmenu
}) => {
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="min-h-full flex flex-col">
        {/* Mobile Menu Content */}
        <div className="flex-grow px-4 py-6 pb-24">
          {/* Contact Info */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center gap-3 py-2">
              <Phone size={18} className="text-primary-500" />
              <a href="tel:+1-234-567-8900" className="text-gray-800 hover:text-primary-500 transition-colors">
                (234) 567-8900
              </a>
            </div>
            
            <div className="flex items-center gap-3 py-2">
              <Clock size={18} className="text-primary-500" />
              <span className="text-gray-800">Mon-Sat: 9am-7pm | Sun: 10am-5pm</span>
            </div>
            
            <div className="flex items-center gap-3 py-2">
              <MapPin size={18} className="text-primary-500" />
              <Link href="/contact" className="text-gray-800 hover:text-primary-500 transition-colors">
                123 Auto Drive, Car City, CC 12345
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name} className="border-b border-gray-100">
                  {link.submenu ? (
                    <div>
                      <button 
                        className={`flex items-center justify-between w-full p-4 ${
                          isActive(link.path) ? 'text-accent-500 font-medium' : 'text-gray-800'
                        }`}
                        onClick={() => toggleSubmenu(link.name)}
                        aria-expanded={activeSubmenu === link.name}
                      >
                        <span>{link.name}</span>
                        {activeSubmenu === link.name ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                      
                      {activeSubmenu === link.name && (
                        <div className="bg-gray-50 px-4 py-2 mb-2 rounded-md animate-fadeIn">
                          {link.submenu.map((subItem) => (
                            <Link 
                              key={subItem.name} 
                              href={subItem.path}
                              className={`block p-3 ${
                                isActive(subItem.path) 
                                ? 'text-accent-500 font-medium' 
                                : 'text-gray-700 hover:text-primary-500'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      href={link.path}
                      className={`block p-4 ${
                        isActive(link.path) 
                        ? 'text-accent-500 font-medium' 
                        : 'text-gray-800 hover:text-primary-500'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Fixed CTA Button at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
          <Link 
            href="/contact" 
            className="block w-full bg-accent-500 hover:bg-accent-600 text-white py-3 px-6 rounded-md font-medium transition-colors text-center shadow-md"
          >
            Schedule Test Drive
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;