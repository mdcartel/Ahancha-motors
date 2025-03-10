/**
 * Application constants
 */

// Company Information
export const COMPANY_NAME = 'Premium Auto Dealership';
export const COMPANY_ADDRESS = '123 Auto Drive, Car City, CC 12345';
export const COMPANY_PHONE = '(234) 567-8900';
export const COMPANY_EMAIL = 'info@premiumauto.com';
export const COMPANY_HOURS = {
  weekdays: '9:00 AM - 7:00 PM',
  saturday: '9:00 AM - 7:00 PM',
  sunday: '10:00 AM - 5:00 PM',
};

// Department Contact Information
export const DEPARTMENTS = {
  sales: {
    name: 'Sales Department',
    phone: '(234) 567-8901',
    email: 'sales@premiumauto.com',
    hours: 'Mon-Sat: 9am-7pm | Sun: 10am-5pm',
  },
  service: {
    name: 'Service Department',
    phone: '(234) 567-8902',
    email: 'service@premiumauto.com',
    hours: 'Mon-Fri: 8am-6pm | Sat: 9am-4pm',
  },
  finance: {
    name: 'Finance Department',
    phone: '(234) 567-8903',
    email: 'finance@premiumauto.com',
    hours: 'Mon-Sat: 9am-7pm | Sun: By Appointment',
  },
  parts: {
    name: 'Parts Department',
    phone: '(234) 567-8904',
    email: 'parts@premiumauto.com',
    hours: 'Mon-Fri: 8am-6pm | Sat: 9am-4pm',
  },
};

// Social Media Links
export const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/premiumauto',
  twitter: 'https://twitter.com/premiumauto',
  instagram: 'https://instagram.com/premiumauto',
  linkedin: 'https://linkedin.com/company/premiumauto',
  youtube: 'https://youtube.com/premiumauto',
};

// Vehicle-related Constants
export const VEHICLE_CONDITIONS = ['New', 'Used', 'Certified Pre-Owned'];

export const BODY_TYPES = [
  'Sedan',
  'SUV',
  'Truck',
  'Coupe',
  'Convertible',
  'Wagon',
  'Van',
  'Hatchback',
  'Crossover',
];

export const POPULAR_MAKES = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Lexus',
  'Nissan',
  'Hyundai',
  'Kia',
  'Jeep',
  'Subaru',
  'Volkswagen',
  'GMC',
];

export const FUEL_TYPES = [
  'Gasoline',
  'Diesel',
  'Hybrid',
  'Electric',
  'Plug-in Hybrid',
  'Flex Fuel',
  'Hydrogen',
];

export const TRANSMISSION_TYPES = [
  'Automatic',
  'Manual',
  'CVT',
  'Dual-Clutch',
  'Semi-Automatic',
];

export const DRIVETRAIN_TYPES = [
  'FWD',
  'RWD',
  'AWD',
  '4WD',
  '4x4',
  'Front-Wheel Drive',
  'Rear-Wheel Drive',
  'All-Wheel Drive',
  'Four-Wheel Drive',
];

export const INTERIOR_COLORS = [
  'Black',
  'Grey',
  'Beige',
  'Brown',
  'White',
  'Red',
  'Blue',
  'Tan',
];

export const EXTERIOR_COLORS = [
  'Black',
  'White',
  'Silver',
  'Grey',
  'Blue',
  'Red',
  'Green',
  'Brown',
  'Beige',
  'Orange',
  'Yellow',
  'Gold',
  'Purple',
];

export const PRICE_RANGES = [
  { label: 'Under $10,000', min: 0, max: 10000 },
  { label: '$10,000 - $20,000', min: 10000, max: 20000 },
  { label: '$20,000 - $30,000', min: 20000, max: 30000 },
  { label: '$30,000 - $40,000', min: 30000, max: 40000 },
  { label: '$40,000 - $50,000', min: 40000, max: 50000 },
  { label: '$50,000 - $75,000', min: 50000, max: 75000 },
  { label: '$75,000 - $100,000', min: 75000, max: 100000 },
  { label: 'Over $100,000', min: 100000, max: null },
];

export const MILEAGE_RANGES = [
  { label: 'Under 10,000', min: 0, max: 10000 },
  { label: '10,000 - 30,000', min: 10000, max: 30000 },
  { label: '30,000 - 60,000', min: 30000, max: 60000 },
  { label: '60,000 - 100,000', min: 60000, max: 100000 },
  { label: 'Over 100,000', min: 100000, max: null },
];

export const YEAR_RANGES = [
  { label: '2020 & Newer', min: 2020, max: null },
  { label: '2015 - 2019', min: 2015, max: 2019 },
  { label: '2010 - 2014', min: 2010, max: 2014 },
  { label: '2005 - 2009', min: 2005, max: 2009 },
  { label: 'Older than 2005', min: null, max: 2004 },
];

// Financing Constants
export const DEFAULT_LOAN_TERM = 60; // 5 years in months
export const DEFAULT_INTEREST_RATE = 4.99; // 4.99% APR
export const DEFAULT_DOWN_PAYMENT_PERCENTAGE = 10; // 10% down
export const DEFAULT_SALES_TAX_RATE = 6; // 6% sales tax

// Pagination
export const ITEMS_PER_PAGE = 12;

// SEO Constants
export const SEO_DEFAULTS = {
  title: 'Premium Auto Dealership | Find Your Dream Car',
  description:
    'Discover your perfect vehicle at our dealership. Browse our extensive inventory of new, used, and certified pre-owned cars, trucks, and SUVs.',
  keywords:
    'car dealership, auto sales, new cars, used cars, car financing, car service',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@premiumauto',
};

// API Endpoints (for a real application)
export const API_ENDPOINTS = {
  vehicles: '/api/vehicles',
  vehicle: (id: string) => `/api/vehicles/${id}`,
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  testDrive: '/api/test-drive',
};

// Form validation error messages
export const FORM_ERRORS = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be at most ${max} characters`,
};