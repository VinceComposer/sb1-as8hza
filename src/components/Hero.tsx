import React from 'react';
import { Sparkles, ArrowRight, Brain, Target, Rocket, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Startup Founder",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&h=100&q=80",
      content: "PlanCraft helped me transform my startup idea into a comprehensive business plan. The AI suggestions were spot-on!"
    },
    {
      name: "Marcus Rodriguez",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      content: "The AI-powered insights saved me countless hours of research. Highly recommend for any entrepreneur."
    },
    {
      name: "Emily Thompson",
      role: "E-commerce Entrepreneur",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
      content: "From idea to execution, PlanCraft guided me through every step. It's like having a business consultant at your fingertips."
    }
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 z-0" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full mb-6 md:mb-8">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 mr-2" />
            <span className="text-sm md:text-base text-indigo-600 font-medium">AI-Powered Business Planning</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
            Turn Your Vision Into a
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"> Successful Business</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Create professional business plans with AI-powered insights. Get expert guidance and market analysis tailored to your industry.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="group bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Brain,
              title: "Smart Insights",
              description: "Get AI-powered suggestions and market analysis customized for your business idea"
            },
            {
              icon: Target,
              title: "Clear Strategy",
              description: "Build a detailed business plan with step-by-step guidance and expert recommendations"
            },
            {
              icon: Rocket,
              title: "Ready to Launch",
              description: "Create a professional plan that is ready to present to investors and stakeholders"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="absolute -top-4 left-8">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg p-3 shadow-lg">
                  <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trusted by Entrepreneurs</h2>
          <p className="text-gray-600 mt-4">Join thousands of successful business owners who started with PlanCraft</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-sm md:text-base">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-6 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Launch Your Business?</h2>
          <p className="text-base md:text-lg text-indigo-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join successful entrepreneurs who turned their ideas into thriving businesses with PlanCraft.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-white text-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-indigo-50 transition-colors inline-flex items-center group"
          >
            Create Free Account
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}