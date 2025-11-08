'use server';
/**
 * @fileOverview A flow for simplifying a concept for the AI Tutor.
 *
 * - simplifyConcept - A function that simplifies a given concept.
 * - SimplifyConceptInput - The input type for the simplifyConcept function.
 * - SimplifyConceptOutput - The return type for the simplifyConcept function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SimplifyConceptInputSchema = z.object({
  concept: z.string().describe('The concept to be simplified.'),
});
export type SimplifyConceptInput = z.infer<typeof SimplifyConceptInputSchema>;

const SimplifyConceptOutputSchema = z.object({
  explanation: z.string().describe('The simplified explanation of the concept, using an analogy.'),
});
export type SimplifyConceptOutput = z.infer<typeof SimplifyConceptOutputSchema>;

export async function simplifyConcept(input: SimplifyConceptInput): Promise<SimplifyConceptOutput> {
  return simplifyConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyConceptPrompt',
  input: { schema: SimplifyConceptInputSchema },
  output: { schema: SimplifyConceptOutputSchema },
  prompt: `You are an AI Tutor. Your goal is to explain concepts using the "WITH ANALOGIES" learning style.
  
  Explain the following concept through a relatable metaphor, comparing it to an everyday experience.

  Concept:
  {{concept}}
  `,
});

const simplifyConceptFlow = ai.defineFlow(
  {
    name: 'simplifyConceptFlow',
    inputSchema: SimplifyConceptInputSchema,
    outputSchema: SimplifyConceptOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
