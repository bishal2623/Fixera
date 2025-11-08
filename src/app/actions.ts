
'use server';

import { codeRefactorSuggestions, type CodeRefactorSuggestionsInput } from '@/ai/flows/code-refactor-suggestions';
import { generateCreativePrompts, type GenerateCreativePromptsInput } from '@/ai/flows/generate-creative-prompts';
import { getTutorResponse, type TutorResponseInput } from '@/ai/flows/tutor';
import { suggestFollowUps, type SuggestFollowUpsInput } from '@/ai/flows/suggest-follow-ups';
import { simplifyConcept, type SimplifyConceptInput } from '@/ai/flows/simplify-concept';
import { generateSummary, type GenerateSummaryInput } from '@/ai/flows/generate-summary';


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

export async function getTutorAIResponse(input: TutorResponseInput) {
  try {
    const result = await getTutorResponse(input);
    return result;
  } catch (error) {
    console.error('Error in getTutorAIResponse:', error);
    throw new Error('Failed to get tutor response.');
  }
}

export async function getFollowUpSuggestions(input: SuggestFollowUpsInput) {
  try {
    const result = await suggestFollowUps(input);
    return result;
  } catch (error) {
    console.error('Error in getFollowUpSuggestions:', error);
    throw new Error('Failed to get follow-up suggestions.');
  }
}

export async function getSimplifiedConcept(input: SimplifyConceptInput) {
  try {
    const result = await simplifyConcept(input);
    return result;
  } catch (error) {
    console.error('Error in getSimplifiedConcept:', error);
    throw new Error('Failed to get simplified concept.');
  }
}

export async function getSessionSummary(input: GenerateSummaryInput) {
    try {
        const result = await generateSummary(input);
        return result;
    } catch (error) {
        console.error('Error in getSessionSummary:', error);
        throw new Error('Failed to generate session summary.');
    }
}
