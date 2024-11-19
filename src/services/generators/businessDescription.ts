import { ContentContext, GeneratedContent } from '../types';
import { getBusinessIdeas } from '../api';
import { validateDescription, formatContextForPrompt } from '../utils';

export async function generateBusinessDescription(context: ContentContext): Promise<GeneratedContent> {
  try {
    const contextText = formatContextForPrompt(context);
    const prompt = `Generate three unique and comprehensive business descriptions based on the following information:

${contextText}

Each description should be a detailed overview (200-300 words) structured in the following format:

Paragraph 1:
- Core business operations and services
- Unique value proposition
- Target market demographics

Paragraph 2:
- Key competitive advantages
- Strategic vision and growth plans
- Market impact and differentiation

CRITICAL INSTRUCTIONS:
- Maintain consistent structure across all three descriptions
- Use professional, engaging business language
- Include specific details from the provided context
- Ensure each description is unique in content while following the same format
- Focus on clarity, impact, and strategic positioning

Format your response exactly like this:

Description 1:
[First structured business description following the two-paragraph format]

Description 2:
[Second structured business description following the two-paragraph format]

Description 3:
[Third structured business description following the two-paragraph format]`;

    const response = await getBusinessIdeas(prompt);
    
    if (!response?.ideas?.length) {
      throw new Error('Invalid API response structure');
    }

    // Extract descriptions from the combined response
    const descriptions = response.ideas.map(idea => {
      // Clean and prepare the description text
      const cleanText = idea.description
        .replace(/^\[|\]$/g, '')  // Remove brackets
        .trim();

      return cleanText;
    }).filter(desc => validateDescription(desc));

    if (descriptions.length === 0) {
      throw new Error('No valid descriptions generated');
    }

    // Ensure we have exactly three descriptions
    const validDescriptions = descriptions.slice(0, 3);

    return {
      success: true,
      content: validDescriptions
    };
  } catch (error) {
    console.error('Business description generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate business descriptions'
    };
  }
}

export async function enhanceBusinessDescription(context: ContentContext): Promise<GeneratedContent> {
  try {
    const { existingContent } = context;
    const contextText = formatContextForPrompt(context);
    
    const prompt = `Enhance and restructure this business description:

Current Description:
${existingContent}

${contextText}

CRITICAL INSTRUCTIONS:
1. Restructure the content into two clear paragraphs:
   - First paragraph: Core operations, value proposition, and target market
   - Second paragraph: Competitive advantages, vision, and market differentiation
2. Expand the content with more strategic details
3. Enhance professional language and clarity
4. Add specific examples and market positioning
5. Make it more comprehensive while maintaining structure

Format your response exactly like this:
Enhanced Description:
[Your enhanced business description following the two-paragraph format]`;

    const response = await getBusinessIdeas(prompt);
    
    if (!response?.ideas?.[0]?.description) {
      throw new Error('Invalid enhancement response');
    }

    const enhancedContent = response.ideas[0].description
      .replace(/Enhanced Description:\s*/i, '')
      .replace(/^\[|\]$/g, '')
      .trim();

    if (!validateDescription(enhancedContent)) {
      throw new Error('Generated content was invalid');
    }

    return {
      success: true,
      content: [enhancedContent]
    };
  } catch (error) {
    console.error('Business description enhancement error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to enhance business description'
    };
  }
}