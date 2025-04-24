
/**
 * Date utilities for the application
 */

/**
 * Returns a date that is a specified number of days from today
 * @param days Number of days to add to current date
 * @returns ISO date string (YYYY-MM-DD)
 */
export const getFutureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

/**
 * Formats a date string to a more readable format
 * @param dateString Date string in ISO format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

/**
 * Checks if a date is in the past
 * @param dateString Date string to check
 * @returns Boolean indicating if date is in the past
 */
export const isDateInPast = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Checks if a date is within a specified number of days from now
 * @param dateString Date string to check
 * @param days Number of days threshold
 * @returns Boolean indicating if date is within the threshold
 */
export const isDateWithinDays = (dateString: string, days: number): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + days);
  
  return date <= futureDate && date >= today;
};
