import axios from 'axios';
import { BusinessIdea } from '../types';
import { API_CONFIG } from '../config/constants';

interface ApiResponse {
  ideas?: BusinessIdea[];
  error?: string;
}

let lastApiCall = 0;

/**
 * Parse the AI response into structured business ideas
 */
function parseAIResponse(content: string): BusinessIdea[] {
  try {
    // Split the content into separate ideas
    const ideaBlocks = content
      .split(/(?=Description \d+:|^\d+\.)/m)
      .filter(block => block.trim());

    return ideaBlocks.map(block => {
      // Remove numbering and labels
      const cleanBlock = block
        .replace(/^Description \d+:|^\d+\./i, '')
        .trim();

      // Split into description and how it works if present
      const parts = cleanBlock.split(/How it works:/i);
      
      // Extract title from first line if present
      const lines = parts[0].split('\n');
      const title = lines[0].trim();
      const description = lines.slice(1).join('\n').trim() || lines[0].trim();
      
      return {
        title: title || 'Business Idea',
        description: description || '',
        howItWorks: parts[1]?.trim() || description
      };
    }).filter(idea => 
      idea.description.length >= 10 && 
      idea.howItWorks.length >= 10
    );
  } catch (error) {
    console.error('Error parsing AI response:', error);
    throw new Error('Failed to parse response format');
  }
}

/**
 * Generate business ideas using the Perplexity API
 */
export async function getBusinessIdeas(prompt: string): Promise<ApiResponse> {
  const now = Date.now();
  if (now - lastApiCall < API_CONFIG.RATE_LIMIT_INTERVAL) {
    return { error: 'Please wait a few seconds before generating more ideas.' };
  }

  try {
    lastApiCall = now;
    const response = await axios.post(
      API_CONFIG.PERPLEXITY_API_URL,
      {
        model: API_CONFIG.MODEL_NAME,
        messages: [
          {
            role: 'system',
            content: `You are a business consultant helping entrepreneurs generate detailed business descriptions. Format your response exactly like this:

Description 1:
[Detailed business description including what the business does, its mission, vision, and value proposition]
How it works:
[Detailed explanation of the business operations and delivery model]

Description 2:
[Another unique business description]
How it works:
[Detailed explanation for the second business]

Description 3:
[A third unique business description]
How it works:
[Detailed explanation for the third business]

Each description should be comprehensive (200-300 words) and completely different from the others.`
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`
        }
      }
    );

    const content = response.data.choices[0]?.message?.content;
    
    if (!content) {
      console.error('Empty response from API');
      return { error: 'No suggestions received' };
    }

    const ideas = parseAIResponse(content);
    
    if (!ideas.length) {
      console.error('No valid ideas parsed from response');
      return { error: 'Failed to parse suggestions' };
    }

    return { ideas };
  } catch (error) {
    console.error('API Error:', error);
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      return { error: typeof message === 'string' ? message : 'Failed to generate ideas' };
    }
    return { error: 'Failed to generate ideas. Please try again.' };
  }
}