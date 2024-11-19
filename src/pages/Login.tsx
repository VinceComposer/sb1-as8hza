import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mt-2">Sign in to continue to PlanCraft</p>
      </div>
      
      <AuthForm type="login" />
      
      <p className="text-gray-600 mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}