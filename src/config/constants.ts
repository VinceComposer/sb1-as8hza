/**
 * Application-wide constants and configuration values
 */

export const APP_NAME = 'PlanCraft';

export const API_CONFIG = {
  PERPLEXITY_API_URL: 'https://api.perplexity.ai/chat/completions',
  MODEL_NAME: 'llama-3.1-sonar-large-128k-chat',
  RATE_LIMIT_INTERVAL: 10000, // 10 seconds
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  NEW_PLAN: '/dashboard/new-plan',
  MY_PLANS: '/dashboard/my-plans',
  SETTINGS: '/dashboard/settings',
} as const;

export const LOCAL_STORAGE_KEYS = {
  USER: 'user',
  USERS: 'users', // Added users key for storing all registered users
  BUSINESS_PLANS: 'businessPlans',
  GENERATED_IDEAS: 'generatedIdeas',
} as const;