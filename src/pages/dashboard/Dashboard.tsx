import React, { useState } from 'react';
import { getBusinessIdeas } from '../../services/api';
import { IdeaGeneratorForm } from '../../components/IdeaGeneratorForm';
import { IdeaList } from '../../components/IdeaList';
import { BusinessIdea } from '../../types';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetIdeas = async () => {
    if (!prompt.trim()) {
      setError('Please enter a business concept');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getBusinessIdeas(prompt);
      if (response.error) {
        setError(response.error);
      } else if (response.ideas) {
        setIdeas(response.ideas);
        setPrompt(''); // Clear the input after successful generation
      }
    } catch (err) {
      setError('Failed to generate ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIdeas([]);
    setError(null);
    setPrompt('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <IdeaGeneratorForm
        prompt={prompt}
        loading={loading}
        error={error}
        onPromptChange={setPrompt}
        onSubmit={handleGetIdeas}
      />
      <IdeaList
        ideas={ideas}
        onReset={handleReset}
      />
    </div>
  );
}