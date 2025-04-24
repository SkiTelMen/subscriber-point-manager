
/**
 * Validation utilities for form inputs
 */

/**
 * Validates a Russian TIN (INN)
 * @param tin TIN string to validate
 * @returns Boolean indicating if TIN is valid
 */
export const isValidTin = (tin: string): boolean => {
  if (!tin) return false;
  
  // Individual TIN (12 digits)
  if (tin.length === 12 && /^\d{12}$/.test(tin)) {
    return true;
  }
  
  // Legal entity TIN (10 digits)
  if (tin.length === 10 && /^\d{10}$/.test(tin)) {
    return true;
  }
  
  return false;
};

/**
 * Validates a Russian OGRN
 * @param ogrn OGRN string to validate
 * @returns Boolean indicating if OGRN is valid
 */
export const isValidOgrn = (ogrn: string): boolean => {
  if (!ogrn) return false;
  
  // Legal entity OGRN (13 digits)
  if (ogrn.length === 13 && /^\d{13}$/.test(ogrn)) {
    return true;
  }
  
  // Individual entrepreneur OGRN (15 digits)
  if (ogrn.length === 15 && /^\d{15}$/.test(ogrn)) {
    return true;
  }
  
  return false;
};

/**
 * Validates a Russian phone number
 * @param phone Phone number string to validate
 * @returns Boolean indicating if phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  
  // Simplified check for demonstration
  // For a real implementation, use a proper phone validation library
  return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(phone);
};
