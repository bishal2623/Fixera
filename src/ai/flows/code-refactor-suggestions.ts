'use server';

/**
 * @fileOverview Provides code refactoring suggestions based on the user's coding style.
 *
 * - codeRefactorSuggestions - A function that takes code as input and returns refactoring suggestions.
 * - CodeRefactorSuggestionsInput - The input type for the codeRefactorSuggestions function.
 * - CodeRefactorSuggestionsOutput - The return type for the codeRefactorSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeRefactorSuggestionsInputSchema = z.object({
  code: z.string().describe('The code to analyze and provide refactoring suggestions for.'),
  codingStyle: z.string().optional().describe('Description of the preferred coding style.'),
});
export type CodeRefactorSuggestionsInput = z.infer<
  typeof CodeRefactorSuggestionsInputSchema
>;

const CodeRefactorSuggestionsOutputSchema = z.object({
  refactoredCode: z.string().describe('The refactored code snippet.'),
  explanation: z.string().describe('A short, 2-sentence reason for the change.'),
});
export type CodeRefactorSuggestionsOutput = z.infer<
  typeof CodeRefactorSuggestionsOutputSchema
>;

export async function codeRefactorSuggestions(
  input: CodeRefactorSuggestionsInput
): Promise<CodeRefactorSuggestionsOutput> {
  return codeRefactorSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeRefactorSuggestionsPrompt',
  input: {schema: CodeRefactorSuggestionsInputSchema},
  output: {schema: CodeRefactorSuggestionsOutputSchema},
  prompt: `You are a code refactoring expert. Analyze the following code and
  provide a refactored version based on the specified coding style, if any.
  Also provide a short, 2-sentence explanation for the changes.

  Code:
  {{{code}}}

  Coding Style:
  {{#if codingStyle}}
    {{codingStyle}}
  {{else}}
    Follow common coding best practices for readability, performance, and maintainability.
  {{/if}}

  Return a JSON object with two keys: "refactoredCode" and "explanation".
  `,
});

const codeRefactorSuggestionsFlow = ai.defineFlow(
  {
    name: 'codeRefactorSuggestionsFlow',
    inputSchema: CodeRefactorSuggestionsInputSchema,
    outputSchema: CodeRefactorSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
