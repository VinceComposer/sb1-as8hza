/**
 * Utility functions for handling local storage operations
 */

import { LOCAL_STORAGE_KEYS } from '../config/constants';
import { User, BusinessPlan } from '../types';

interface StoredUser extends User {
  password: string;
}

/**
 * Get stored user from local storage
 */
export const getStoredUser = (): User | null => {
  try {
    const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    if (!userData) return null;
    const user: StoredUser = JSON.parse(userData);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

/**
 * Store user in local storage
 */
export const storeUser = (user: StoredUser): void => {
  try {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user:', error);
  }
};

/**
 * Check if email is already registered
 */
export const isEmailRegistered = (email: string): boolean => {
  try {
    const users: StoredUser[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS) || '[]');
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
};

/**
 * Register new user
 */
export const registerUser = (user: StoredUser): void => {
  try {
    const users: StoredUser[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS) || '[]');
    users.push(user);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(users));
    storeUser(user);
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
};

/**
 * Validate user credentials
 */
export const validateUserCredentials = (email: string, password: string): User | null => {
  try {
    const users: StoredUser[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return null;
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error validating credentials:', error);
    return null;
  }
};

/**
 * Get business plans for specific user
 */
export const getStoredBusinessPlans = (userId: string): BusinessPlan[] => {
  try {
    const plans: BusinessPlan[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.BUSINESS_PLANS) || '[]');
    return plans.filter(plan => plan.userId === userId);
  } catch (error) {
    console.error('Error getting business plans:', error);
    return [];
  }
};

/**
 * Store business plan
 */
export const storeBusinessPlan = (plan: BusinessPlan): void => {
  try {
    const plans: BusinessPlan[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.BUSINESS_PLANS) || '[]');
    const planIndex = plans.findIndex(p => p.id === plan.id);
    
    if (planIndex >= 0) {
      plans[planIndex] = plan;
    } else {
      plans.unshift(plan);
    }
    
    localStorage.setItem(LOCAL_STORAGE_KEYS.BUSINESS_PLANS, JSON.stringify(plans));
  } catch (error) {
    console.error('Error storing business plan:', error);
    throw new Error('Failed to save business plan');
  }
};

/**
 * Delete business plan
 */
export const deleteBusinessPlan = (planId: string, userId: string): void => {
  try {
    const plans: BusinessPlan[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.BUSINESS_PLANS) || '[]');
    const updatedPlans = plans.filter(plan => !(plan.id === planId && plan.userId === userId));
    localStorage.setItem(LOCAL_STORAGE_KEYS.BUSINESS_PLANS, JSON.stringify(updatedPlans));
  } catch (error) {
    console.error('Error deleting business plan:', error);
    throw new Error('Failed to delete business plan');
  }
};