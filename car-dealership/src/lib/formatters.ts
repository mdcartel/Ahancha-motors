/**
 * Utility functions for formatting data
 */

/**
 * Format a date string into a localized format
 * @param dateString - ISO date string to format
 * @param options - Intl.DateTimeFormatOptions to customize output
 * @returns Formatted date string
 */
export function formatDate(
    dateString: string, 
    options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  ): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  /**
   * Format a number as currency
   * @param amount - Number to format as currency
   * @param currency - Currency code (default: USD)
   * @param locale - Locale code (default: en-US)
   * @returns Formatted currency string
   */
  export function formatCurrency(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  /**
   * Format a number with thousand separators
   * @param number - Number to format
   * @param locale - Locale code (default: en-US)
   * @returns Formatted number string with thousand separators
   */
  export function formatNumber(
    number: number,
    locale: string = 'en-US'
  ): string {
    return new Intl.NumberFormat(locale).format(number);
  }
  
  /**
   * Format a phone number in US format (XXX) XXX-XXXX
   * @param phoneNumber - Phone number to format
   * @returns Formatted phone number string
   */
  export function formatPhoneNumber(phoneNumber: string): string {
    // Clean the phone number to remove any non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if the cleaned number has the expected length for a US number
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length === 11 && cleaned.charAt(0) === '1') {
      // Handle case with country code
      return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
    }
    
    // If the number doesn't match expected formats, return it as is
    return phoneNumber;
  }
  
  /**
   * Format a number as a percentage
   * @param value - Number to format as percentage
   * @param decimalPlaces - Number of decimal places to display (default: 2)
   * @param locale - Locale code (default: en-US)
   * @returns Formatted percentage string
   */
  export function formatPercentage(
    value: number,
    decimalPlaces: number = 2,
    locale: string = 'en-US'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(value / 100);
  }
  
  /**
   * Format number of miles for vehicle mileage
   * @param miles - Number of miles to format
   * @param locale - Locale code (default: en-US)
   * @returns Formatted mileage string
   */
  export function formatMileage(
    miles: number,
    locale: string = 'en-US'
  ): string {
    return `${new Intl.NumberFormat(locale).format(miles)} miles`;
  }
  
  /**
   * Format a VIN number with proper spacing
   * @param vin - VIN to format
   * @returns Formatted VIN string
   */
  export function formatVIN(vin: string): string {
    // VINs are typically 17 characters long with no spaces
    // This formats it as XXX XXXXXXX XXXXXXX for better readability
    if (vin.length === 17) {
      return `${vin.slice(0, 3)} ${vin.slice(3, 10)} ${vin.slice(10)}`;
    }
    
    // Return the original if it doesn't match the expected format
    return vin;
  }
  
  /**
   * Format a fuel economy value in MPG
   * @param mpg - Miles per gallon value
   * @returns Formatted MPG string
   */
  export function formatMPG(mpg: number): string {
    return `${mpg} MPG`;
  }
  
  /**
   * Format combined fuel economy from city and highway values
   * @param city - City MPG
   * @param highway - Highway MPG
   * @returns Formatted combined fuel economy string
   */
  export function formatCombinedFuelEconomy(city: number, highway: number): string {
    // EPA formula for combined fuel economy
    const combined = Math.round(1 / (0.55 / city + 0.45 / highway));
    return `${city} City / ${highway} Hwy / ${combined} Combined MPG`;
  }