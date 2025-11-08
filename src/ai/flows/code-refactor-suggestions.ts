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
  suggestions: z
    .array(z.string())
    .describe('An array of refactoring suggestions for the given code.'),
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
  provide refactoring suggestions based on the specified coding style, if any.

  Code:
  {{code}}

  Coding Style:
  {{#if codingStyle}}
    {{codingStyle}}
  {{else}}
    Follow common coding best practices.
  {{/if}}

  Provide the refactoring suggestions as a numbered list.
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
