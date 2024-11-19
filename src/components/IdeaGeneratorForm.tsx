/**
 * Form component for generating business ideas
 */

import React from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';

interface IdeaGeneratorFormProps {
  prompt: string;
  loading: boolean;
  error: string | null;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
}

export function IdeaGeneratorForm({
  prompt,
  loading,
  error,
  onPromptChange,
  onSubmit,
}: IdeaGeneratorFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Business Idea Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="What interests you?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm md:text-base"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center text-sm md:text-base md:min-w-[160px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
                Generate Ideas
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="p-3 md:p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm md:text-base">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}