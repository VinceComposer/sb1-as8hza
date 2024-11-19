/**
 * Type definitions for the application
 */

// User related types
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Business idea related types
export interface BusinessIdea {
  title: string;
  description: string;
  howItWorks: string;
}

// Business plan related types
export interface BusinessPlan {
  id: string;
  userId: string;  // Add userId to associate plans with users
  created: string;
  lastModified: string;
  coverPage: {
    businessName: string;
    userName?: string;
    date?: string;
    briefDescription?: string;
    howItWorks?: string;
  };
  [key: string]: any;
}

// Form field types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => boolean;
  errorMessage?: string;
}