'use server';
/**
 * @fileOverview A flow for generating follow-up questions for the AI Tutor.
 *
 * - suggestFollowUps - A function that suggests follow-up questions.
 * - SuggestFollowUpsInput - The input type for the suggestFollowUps function.
 * - SuggestFollowUpsOutput - The return type for the suggestFollowUps function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestFollowUpsInputSchema = z.object({
  answer: z.string().describe('The AI tutor\'s last answer.'),
});
export type SuggestFollowUpsInput = z.infer<typeof SuggestFollowUpsInputSchema>;

const SuggestFollowUpsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of 3 short, insightful follow-up questions a student might ask.'),
});
export type SuggestFollowUpsOutput = z.infer<typeof SuggestFollowUpsOutputSchema>;

export async function suggestFollowUps(input: SuggestFollowUpsInput): Promise<SuggestFollowUpsOutput> {
  return suggestFollowUpsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFollowUpsPrompt',
  input: { schema: SuggestFollowUpsInputSchema },
  output: { schema: SuggestFollowUpsOutputSchema },
  prompt: `Based on your last answer, suggest 3 short, insightful follow-up questions a student might ask.
  
  Last Answer:
  {{answer}}

  Respond ONLY with a JSON object containing an array of strings. Example: {"questions": ["question 1", "question 2", "question 3"]}`,
});

const suggestFollowUpsFlow = ai.defineFlow(
  {
    name: 'suggestFollowUpsFlow',
    inputSchema: SuggestFollowUpsInputSchema,
    outputSchema: SuggestFollowUpsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
