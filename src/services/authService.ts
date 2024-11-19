/**
 * Authentication service for handling user-related operations
 */

import { User } from '../types';
import { LOCAL_STORAGE_KEYS } from '../config/constants';
import { isValidEmail, isValidPassword } from '../utils/validation';

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Register a new user
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    if (!isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (!isValidPassword(password)) {
      return { success: false, error: 'Please enter a password' };
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS) || '[]');
    const emailExists = existingUsers.some(
      (user: any) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      return { 
        success: false, 
        error: 'Email already in use. Please use a different email address.' 
      };
    }

    // Create new user object
    const newUser = {
      id: crypto.randomUUID(),
      email,
      name,
      password
    };

    // Store in users collection with existing users
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

    // Create session without password
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: 'Unable to create account. Please try again later.' 
    };
  }
};

/**
 * Login user with credentials
 */
export const loginUser = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  try {
    if (!isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (!isValidPassword(password)) {
      return { success: false, error: 'Please enter a password' };
    }

    const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS) || '[]');
    const foundUser = users.find((u: any) => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );

    if (!foundUser) {
      return { 
        success: false, 
        error: 'Invalid email or password. Please try again.' 
      };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: 'Unable to sign in. Please try again later.' 
    };
  }
};

/**
 * Logout current user
 */
export const logoutUser = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
};