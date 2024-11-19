import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="text-gray-600 mt-2">Start creating your business plan today</p>
      </div>
      
      <AuthForm type="register" />
      
      <p className="text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}