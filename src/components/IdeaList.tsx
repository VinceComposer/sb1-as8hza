/**
 * Component for displaying generated business ideas
 */

import React from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { BusinessIdea } from '../types';
import { useNavigate } from 'react-router-dom';

interface IdeaListProps {
  ideas: BusinessIdea[];
  onReset: () => void;
}

export function IdeaList({ ideas, onReset }: IdeaListProps) {
  const navigate = useNavigate();

  if (!ideas?.length) return null;

  const handleCreatePlan = (idea: BusinessIdea) => {
    // Prevent multiple rapid clicks
    const button = event?.target as HTMLButtonElement;
    if (button) {
      button.disabled = true;
    }

    // Use replace instead of push to prevent back navigation to duplicate
    navigate('/dashboard/new-plan', {
      replace: true,
      state: { ideaData: idea }
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {ideas.map((idea, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">{idea.title}</h2>
            <button
              onClick={() => handleCreatePlan(idea)}
              className="group w-full md:w-auto px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center md:justify-start gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Plan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-sm md:text-base text-gray-700">{idea.description}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">How it works</h3>
              <p className="text-sm md:text-base text-gray-700">{idea.howItWorks}</p>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={onReset}
        className="w-full px-4 py-2 text-sm md:text-base text-gray-600 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Start Over
      </button>
    </div>
  );
}