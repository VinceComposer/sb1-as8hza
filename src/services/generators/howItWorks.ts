import { ContentContext, GeneratedContent } from '../types';
import { getBusinessIdeas } from '../api';
import { validateDescription, formatContextForPrompt } from '../utils';

export async function generateHowItWorks(context: ContentContext): Promise<GeneratedContent> {
  try {
    const contextText = formatContextForPrompt(context);
    const prompt = `Generate three unique operational explanations for this business:

${contextText}

Each explanation should be a concise overview (150-200 words) with these key points:

1. Process Flow:
   - Step-by-step operational process
   - Key technologies and systems
   - Daily procedures

2. Customer Experience:
   - Service delivery method
   - Customer interaction points
   - Support processes

3. Resources:
   - Required tools and infrastructure
   - Quality assurance methods
   - Key partnerships

CRITICAL INSTRUCTIONS:
- Create three DIFFERENT explanations
- Each must follow the same structure
- Use clear, practical language
- Focus on implementation details

Format your response exactly like this:

Description 1:
[First operational explanation following the three-point structure]

Description 2:
[Second operational explanation following the three-point structure]

Description 3:
[Third operational explanation following the three-point structure]`;

    const response = await getBusinessIdeas(prompt);
    
    if (!response?.ideas?.length) {
      throw new Error('No ideas generated');
    }

    const explanations = response.ideas
      .map(idea => idea.description.trim())
      .filter(desc => desc.length > 0)
      .map(desc => desc.replace(/^Description \d+:\s*/i, ''))
      .map(desc => desc.replace(/^\[|\]$/g, ''))
      .map(desc => desc.trim())
      .filter(desc => validateDescription(desc));

    if (explanations.length === 0) {
      throw new Error('No valid explanations generated');
    }

    return {
      success: true,
      content: explanations.slice(0, 3)
    };
  } catch (error) {
    console.error('How It Works generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate operational explanations'
    };
  }
}

export async function enhanceHowItWorks(context: ContentContext): Promise<GeneratedContent> {
  try {
    const { existingContent } = context;
    if (!existingContent) {
      throw new Error('No content provided for enhancement');
    }

    const contextText = formatContextForPrompt(context);
    const prompt = `Enhance this operational explanation:

Current Explanation:
${existingContent}

${contextText}

CRITICAL INSTRUCTIONS:
1. Restructure the content into three clear paragraphs:
   - First paragraph: Process Flow, describing the step-by-step operations and systems
   - Second paragraph: Customer Experience and explaining of the service delivery and interactions
   - Third paragraph: Resources, describing infrastructure and partnerships
2. Expand the content with more strategic details
3. Enhance professional language and clarity
4. Make it more comprehensive while maintaining structure

Format your response exactly like this:
Enhanced Description:
[Your enhanced operational explanation with the three paragraphs clearly marked]`;

    const response = await getBusinessIdeas(prompt);
    
    if (!response?.ideas?.[0]?.description) {
      throw new Error('Invalid enhancement response');
    }

    let enhancedContent = response.ideas[0].description
      .replace(/^Enhanced Description:\s*/i, '')
      .replace(/^\[|\]$/g, '')
      .trim();

    if (!validateDescription(enhancedContent)) {
      throw new Error('Invalid enhanced content generated');
    }

    // Format the sections consistently
    enhancedContent = enhancedContent
      .replace(/Process Flow:/g, '\nProcess Flow:')
      .replace(/Customer Experience:/g, '\nCustomer Experience:')
      .replace(/Resources:/g, '\nResources:')
      .trim();

    return {
      success: true,
      content: [enhancedContent]
    };
  } catch (error) {
    console.error('How It Works enhancement error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to enhance operational explanation'
    };
  }
}