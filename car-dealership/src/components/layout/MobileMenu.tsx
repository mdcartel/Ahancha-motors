'use client';

import React from 'react';
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

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto pt-20">
      <div className="container mx-auto px-4 pb-8">
        {/* Contact Info */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center gap-2 py-2">
            <Phone size={18} className="text-primary" />
            <a href="tel:+1-234-567-8900" className="text-gray-800 hover:text-accent transition-colors">
              (234) 567-8900
            </a>
          </div>
          
          <div className="flex items-center gap-2 py-2">
            <Clock size={18} className="text-primary" />
            <span className="text-gray-800">Mon-Sat: 9am-7pm | Sun: 10am-5pm</span>
          </div>
          
          <div className="flex items-center gap-2 py-2">
            <MapPin size={18} className="text-primary" />
            <Link href="/contact" className="text-gray-800 hover:text-accent transition-colors">
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
                      className={`flex items-center justify-between w-full p-3 ${isActive(link.path) ? 'text-accent font-medium' : 'text-gray-800'}`}
                      onClick={() => toggleSubmenu(link.name)}
                    >
                      <span>{link.name}</span>
                      {activeSubmenu === link.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    
                    {activeSubmenu === link.name && (
                      <div className="bg-gray-50 px-3 py-2">
                        {link.submenu.map((subItem) => (
                          <Link 
                            key={subItem.name} 
                            href={subItem.path}
                            className={`block p-2 ${isActive(subItem.path) ? 'text-accent font-medium' : 'text-gray-700 hover:text-accent'}`}
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
                    className={`block p-3 ${isActive(link.path) ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'}`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="mt-6">
          <Link href="/contact" className="block w-full text-center bg-accent text-white py-3 px-6 rounded-md font-medium hover:bg-accent-dark transition-colors">
            Schedule Test Drive
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;