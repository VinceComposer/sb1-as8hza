import { ContentContext, GeneratedContent } from './types';
import { generateBusinessDescription, enhanceBusinessDescription } from './generators/businessDescription';
import { generateHowItWorks, enhanceHowItWorks } from './generators/howItWorks';

export async function generateFieldContent(
  fieldId: string,
  context: ContentContext = {},
  placeholder?: string
): Promise<GeneratedContent> {
  if (fieldId !== 'briefDescription' && fieldId !== 'howItWorks') {
    return { 
      success: false, 
      error: 'Content generation not supported for this field' 
    };
  }

  try {
    const isEnhancement = Boolean(context.existingContent);
    
    if (fieldId === 'briefDescription') {
      return isEnhancement 
        ? await enhanceBusinessDescription(context)
        : await generateBusinessDescription(context);
    } else {
      return isEnhancement
        ? await enhanceHowItWorks(context)
        : await generateHowItWorks(context);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return {
      success: false,
      error: `${errorMessage}. Please try again.`
    };
  }
}