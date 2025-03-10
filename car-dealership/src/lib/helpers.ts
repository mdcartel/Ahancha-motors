// Helper functions for the application

/**
 * Formats a price value as a string with thousand separators and currency symbol
 * @param price - The price to format
 * @param currency - The currency symbol (default: $)
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency: string = '$'): string {
    return `${currency}${price.toLocaleString()}`;
  }
  
  /**
   * Formats a mileage value as a string with thousand separators
   * @param mileage - The mileage to format
   * @returns Formatted mileage string
   */
  export function formatMileage(mileage: number): string {
    return `${mileage.toLocaleString()} miles`;
  }
  
  /**
   * Generates a title string for a vehicle
   * @param year - Vehicle year
   * @param make - Vehicle make
   * @param model - Vehicle model
   * @param trim - Vehicle trim (optional)
   * @returns Formatted title string
   */
  export function generateVehicleTitle(year: number, make: string, model: string, trim?: string): string {
    return trim ? `${year} ${make} ${model} ${trim}` : `${year} ${make} ${model}`;
  }
  
  /**
   * Truncates a string to a specified length and adds ellipsis if necessary
   * @param str - The string to truncate
   * @param maxLength - Maximum length before truncation
   * @returns Truncated string
   */
  export function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  }
  
  /**
   * Extracts unique values from an array of objects for a specific key
   * @param arr - Array of objects
   * @param key - The key to extract values from
   * @returns Array of unique values for the specified key
   */
  export function getUniqueValues<T, K extends keyof T>(arr: T[], key: K): T[K][] {
    const valueSet = new Set<T[K]>();
    arr.forEach(item => {
      if (item[key] !== undefined && item[key] !== null) {
        valueSet.add(item[key]);
      }
    });
    return Array.from(valueSet);
  }
  
  /**
   * Maps vehicle condition to a badge style
   * @param condition - The vehicle condition
   * @returns Object with text color and background color classes
   */
  export function getConditionBadgeClasses(condition: string): { text: string, bg: string } {
    switch (condition.toLowerCase()) {
      case 'new':
        return { text: 'text-green-800', bg: 'bg-green-100' };
      case 'used':
        return { text: 'text-blue-800', bg: 'bg-blue-100' };
      case 'certified':
      case 'certified pre-owned':
      case 'cpo':
        return { text: 'text-purple-800', bg: 'bg-purple-100' };
      default:
        return { text: 'text-gray-800', bg: 'bg-gray-100' };
    }
  }
  
  /**
   * Generates URL-friendly slug from a string
   * @param str - The string to slugify
   * @returns URL-friendly slug
   */
  export function slugify(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove non-word chars
      .replace(/[\s_-]+/g, '-')   // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
  }
  
  /**
   * Checks if a search term is included in a vehicle's searchable properties
   * @param vehicle - The vehicle object to search in
   * @param searchTerm - The search term to look for
   * @returns Boolean indicating if the search term was found
   */
  export function vehicleMatchesSearchTerm(vehicle: any, searchTerm: string): boolean {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    const searchableProps = [
      vehicle.title,
      vehicle.make,
      vehicle.model,
      vehicle.trim,
      vehicle.year?.toString(),
      vehicle.exteriorColor,
      vehicle.interiorColor,
      vehicle.bodyType,
      vehicle.transmission,
      vehicle.fuelType,
      vehicle.drivetrain,
      vehicle.engine,
      vehicle.vin,
      vehicle.stockNumber,
    ];
    
    return searchableProps.some(prop => 
      prop && prop.toLowerCase().includes(term)
    );
  }