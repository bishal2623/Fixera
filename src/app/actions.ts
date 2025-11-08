
'use server';

import { codeRefactorSuggestions, type CodeRefactorSuggestionsInput } from '@/ai/flows/code-refactor-suggestions';
import { generateCreativePrompts, type GenerateCreativePromptsInput } from '@/ai/flows/generate-creative-prompts';

export async function getCodeRefactorSuggestions(input: CodeRefactorSuggestionsInput) {
  try {
    const result = await codeRefactorSuggestions(input);
    return result;
  } catch (error) {
    console.error('Error in getCodeRefactorSuggestions:', error);
    throw new Error('Failed to get refactoring suggestions.');
  }
}

export async function getCreativePrompt(input: GenerateCreativePromptsInput) {
  try {
    const result = await generateCreativePrompts(input);
    return result;
  } catch (error) {
    console.error('Error in getCreativePrompt:', error);
    throw new Error('Failed to generate a creative prompt.');
  }
}
