/**
 * Utility functions for form validation
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password is not empty
 */
export const isValidPassword = (password: string): boolean => {
  return password.trim().length > 0;
};

/**
 * Validate required field
 */
export const isRequiredField = (value: string): boolean => {
  return value.trim().length > 0;
};