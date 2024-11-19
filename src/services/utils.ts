import { ContentContext } from './types';

export function validateDescription(description: string): boolean {
  if (!description || typeof description !== 'string') return false;
  return description.length >= 10 && description.length <= 5000;
}

export function formatContextForPrompt(context: ContentContext): string {
  const { previousDescriptions, existingContent, ...otherContext } = context;
  
  const contextEntries = Object.entries(otherContext)
    .filter(([_, value]) => value)
    .map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
      return `${formattedKey}: ${value}`;
    })
    .join('\n');
  
  return contextEntries ? `\nBusiness Information:\n${contextEntries}` : '';
}